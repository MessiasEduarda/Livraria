package com.entrecapitulos.gestaolivraria.service;

import com.entrecapitulos.gestaolivraria.dto.*;
import com.entrecapitulos.gestaolivraria.entity.*;
import com.entrecapitulos.gestaolivraria.repository.*;
import org.springframework.data.jpa.domain.Specification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VendaService {

    private final VendaRepository vendaRepository;
    private final ClienteRepository clienteRepository;
    private final LivroRepository livroRepository;
    private final UsuarioRepository usuarioRepository;
    private final ItemVendaRepository itemVendaRepository;

    @Transactional(readOnly = true)
    public PageResponse<VendaDTO> listar(LocalDateTime dataInicio, LocalDateTime dataFim, String status, String categoria, int page, int size) {
        Venda.StatusVenda statusEnum = status != null && !status.isBlank() ? Venda.StatusVenda.valueOf(status.toUpperCase()) : null;
        String cat = categoria != null && !categoria.isBlank() ? categoria : null;
        Specification<Venda> spec = VendaSpecification.withFilters(dataInicio, dataFim, statusEnum, cat, null);
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "dataVenda"));
        Page<Venda> p = vendaRepository.findAll(spec, pageable);
        List<VendaDTO> dtos = p.getContent().stream().map(this::toDTO).toList();
        return new PageResponse<>(dtos, p.getNumber(), p.getSize(), p.getTotalElements(), p.getTotalPages(), p.isFirst(), p.isLast());
    }

    @Transactional(readOnly = true)
    public PageResponse<VendaDTO> listarPorVendedor(Long vendedorId, LocalDateTime dataInicio, LocalDateTime dataFim, String status, int page, int size) {
        Venda.StatusVenda statusEnum = status != null && !status.isBlank() ? Venda.StatusVenda.valueOf(status.toUpperCase()) : null;
        Specification<Venda> spec = VendaSpecification.withFilters(dataInicio, dataFim, statusEnum, null, vendedorId);
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "dataVenda"));
        Page<Venda> p = vendaRepository.findAll(spec, pageable);
        List<VendaDTO> dtos = p.getContent().stream().map(this::toDTO).toList();
        return new PageResponse<>(dtos, p.getNumber(), p.getSize(), p.getTotalElements(), p.getTotalPages(), p.isFirst(), p.isLast());
    }

    @Transactional(readOnly = true)
    public MinhasVendasResumoDTO resumoMinhasVendas(Long vendedorId, LocalDateTime dataInicio, LocalDateTime dataFim, String status) {
        BigDecimal totalReceita = vendaRepository.receitaTotalPorVendedor(vendedorId, dataInicio, dataFim);
        if (totalReceita == null) totalReceita = BigDecimal.ZERO;
        Venda.StatusVenda statusEnum = status != null && !status.isBlank() ? Venda.StatusVenda.valueOf(status.toUpperCase()) : null;
        Specification<Venda> spec = VendaSpecification.withFilters(dataInicio, dataFim, statusEnum, null, vendedorId);
        long totalVendas = vendaRepository.count(spec);
        BigDecimal ticketMedio = totalVendas > 0 ? totalReceita.divide(BigDecimal.valueOf(totalVendas), 2, RoundingMode.HALF_UP) : BigDecimal.ZERO;
        return MinhasVendasResumoDTO.builder()
                .totalReceita(totalReceita)
                .totalVendas(totalVendas)
                .ticketMedio(ticketMedio)
                .build();
    }

    @Transactional(readOnly = true)
    public VendaDTO buscarPorId(Long id) {
        Venda v = vendaRepository.findById(id).orElseThrow(() -> new RuntimeException("Venda não encontrada"));
        return toDTO(v);
    }

    @Transactional
    public VendaDTO criar(NovaVendaRequest request) {
        Cliente cliente = clienteRepository.findById(request.getClienteId()).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        Usuario vendedor = request.getVendedorId() != null ? usuarioRepository.findById(request.getVendedorId()).orElse(null) : null;

        Venda venda = Venda.builder()
                .dataVenda(LocalDateTime.now())
                .cliente(cliente)
                .vendedor(vendedor)
                .status(Venda.StatusVenda.COMPLETED)
                .desconto(request.getDesconto() != null ? request.getDesconto() : BigDecimal.ZERO)
                .formaPagamento(formaPagamento(request.getFormaPagamento()))
                .observacoes(request.getObservacoes())
                .build();

        BigDecimal subtotal = BigDecimal.ZERO;
        for (NovaVendaRequest.ItemVendaRequest itemReq : request.getItens()) {
            Livro livro = livroRepository.findById(itemReq.getLivroId()).orElseThrow(() -> new RuntimeException("Livro não encontrado: " + itemReq.getLivroId()));
            if (livro.getEstoque() < itemReq.getQuantidade())
                throw new RuntimeException("Estoque insuficiente para o livro: " + livro.getTitulo());
            BigDecimal precoUnit = livro.getPreco();
            BigDecimal itemSubtotal = precoUnit.multiply(BigDecimal.valueOf(itemReq.getQuantidade()));
            subtotal = subtotal.add(itemSubtotal);
            ItemVenda iv = ItemVenda.builder()
                    .livro(livro)
                    .quantidade(itemReq.getQuantidade())
                    .precoUnitario(precoUnit)
                    .subtotal(itemSubtotal)
                    .build();
            venda.adicionarItem(iv);
            livro.setEstoque(livro.getEstoque() - itemReq.getQuantidade());
            livroRepository.save(livro);
        }
        BigDecimal total = subtotal.subtract(venda.getDesconto());
        venda.setTotal(total);
        venda = vendaRepository.save(venda);

        cliente.setQuantidadeCompras(cliente.getQuantidadeCompras() + 1);
        cliente.setTotalGasto(cliente.getTotalGasto().add(total));
        clienteRepository.save(cliente);

        return toDTO(venda);
    }

    @Transactional
    public VendaDTO cancelar(Long id) {
        Venda v = vendaRepository.findById(id).orElseThrow(() -> new RuntimeException("Venda não encontrada"));
        if (v.getStatus() == Venda.StatusVenda.CANCELLED)
            throw new RuntimeException("Venda já está cancelada");
        for (ItemVenda iv : v.getItens()) {
            Livro livro = iv.getLivro();
            livro.setEstoque(livro.getEstoque() + iv.getQuantidade());
            livroRepository.save(livro);
        }
        Cliente c = v.getCliente();
        c.setQuantidadeCompras(Math.max(0, c.getQuantidadeCompras() - 1));
        c.setTotalGasto(c.getTotalGasto().subtract(v.getTotal()).max(BigDecimal.ZERO));
        clienteRepository.save(c);
        v.setStatus(Venda.StatusVenda.CANCELLED);
        vendaRepository.save(v);
        return toDTO(v);
    }

    @Transactional(readOnly = true)
    public DashboardDTO dashboard(int dias, int limiteEstoqueCritico) {
        LocalDateTime fim = LocalDateTime.now();
        LocalDateTime inicio = fim.minusDays(dias);

        BigDecimal receitaTotal = vendaRepository.receitaTotal(inicio, fim);
        long vendasConcluidas = vendaRepository.countByStatus(Venda.StatusVenda.COMPLETED);
        List<Venda> vendasList = vendaRepository.findByPeriodoComItens(inicio, fim);
        long totalItens = vendasList.stream().flatMap(v -> v.getItens().stream()).mapToLong(ItemVenda::getQuantidade).sum();
        BigDecimal ticketMedio = vendasConcluidas > 0 ? receitaTotal.divide(BigDecimal.valueOf(vendasConcluidas), 2, RoundingMode.HALF_UP) : BigDecimal.ZERO;

        Map<LocalDate, BigDecimal> porDia = new TreeMap<>();
        Map<LocalDate, Long> pedidosPorDia = new TreeMap<>();
        for (Venda v : vendasList) {
            if (v.getStatus() != Venda.StatusVenda.COMPLETED) continue;
            LocalDate d = v.getDataVenda().toLocalDate();
            porDia.merge(d, v.getTotal(), BigDecimal::add);
            pedidosPorDia.merge(d, 1L, Long::sum);
        }
        List<Map<String, Object>> vendasPorDia = porDia.entrySet().stream()
                .map(e -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("date", e.getKey().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM")));
                    m.put("vendas", e.getValue().doubleValue());
                    m.put("pedidos", pedidosPorDia.getOrDefault(e.getKey(), 0L));
                    return m;
                })
                .collect(Collectors.toList());

        Map<String, BigDecimal> porCategoria = new HashMap<>();
        for (Venda v : vendasList) {
            if (v.getStatus() != Venda.StatusVenda.COMPLETED) continue;
            for (ItemVenda iv : v.getItens()) {
                String cat = iv.getLivro().getCategoria();
                porCategoria.merge(cat, iv.getSubtotal(), BigDecimal::add);
            }
        }
        BigDecimal totalCat = porCategoria.values().stream().reduce(BigDecimal.ZERO, BigDecimal::add);
        List<Map<String, Object>> vendasPorCategoria = porCategoria.entrySet().stream()
                .map(e -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("name", e.getKey());
                    m.put("value", e.getValue().doubleValue());
                    m.put("percentage", totalCat.compareTo(BigDecimal.ZERO) == 0 ? 0 : e.getValue().multiply(BigDecimal.valueOf(100)).divide(totalCat, 0, RoundingMode.HALF_UP).intValue());
                    return m;
                })
                .collect(Collectors.toList());

        List<Object[]> top = itemVendaRepository.topLivrosVendidos(inicio, fim, PageRequest.of(0, 5));
        List<Map<String, Object>> topProdutos = new ArrayList<>();
        int rank = 1;
        for (Object[] row : top) {
            Livro livro = (Livro) row[0];
            Long qtd = (Long) row[1];
            BigDecimal receita = vendasList.stream()
                    .flatMap(v -> v.getItens().stream())
                    .filter(iv -> iv.getLivro().getId().equals(livro.getId()))
                    .map(ItemVenda::getSubtotal)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            Map<String, Object> m = new HashMap<>();
            m.put("rank", rank++);
            m.put("name", livro.getTitulo());
            m.put("author", livro.getAutor());
            m.put("category", livro.getCategoria());
            m.put("sales", qtd);
            m.put("revenue", receita.doubleValue());
            topProdutos.add(m);
        }

        List<LivroDTO> estoqueCritico = livroRepository.findByEstoqueLessThanEqual(limiteEstoqueCritico)
                .stream().map(LivroDTO::fromEntity).collect(Collectors.toList());

        return DashboardDTO.builder()
                .receitaTotal(receitaTotal != null ? receitaTotal : BigDecimal.ZERO)
                .vendasConcluidas(vendasConcluidas)
                .ticketMedio(ticketMedio)
                .totalItensVendidos(totalItens)
                .vendasPorDia(vendasPorDia)
                .vendasPorCategoria(vendasPorCategoria)
                .topProdutos(topProdutos)
                .estoqueCritico(estoqueCritico)
                .build();
    }

    private VendaDTO toDTO(Venda v) {
        VendaDTO dto = VendaDTO.fromEntity(v);
        return dto;
    }

    private Venda.FormaPagamento formaPagamento(String s) {
        if (s == null) return null;
        return switch (s.toLowerCase()) {
            case "dinheiro" -> Venda.FormaPagamento.DINHEIRO;
            case "debito" -> Venda.FormaPagamento.DEBITO;
            case "credito" -> Venda.FormaPagamento.CREDITO;
            case "pix" -> Venda.FormaPagamento.PIX;
            default -> null;
        };
    }
}
