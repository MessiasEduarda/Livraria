package com.entrecapitulos.gestaolivraria.service;

import com.entrecapitulos.gestaolivraria.dto.LivroDTO;
import com.entrecapitulos.gestaolivraria.dto.PageResponse;
import com.entrecapitulos.gestaolivraria.entity.Livro;
import com.entrecapitulos.gestaolivraria.repository.ItemVendaRepository;
import com.entrecapitulos.gestaolivraria.repository.LivroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LivroService {

    private final LivroRepository livroRepository;
    private final ItemVendaRepository itemVendaRepository;

    @Transactional(readOnly = true)
    public PageResponse<LivroDTO> listar(String busca, String categoria, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("titulo"));
        Page<Livro> p = livroRepository.filtrar(
                busca != null && !busca.isBlank() ? busca : null,
                categoria != null && !categoria.isBlank() ? categoria : null,
                pageable);
        return new PageResponse<>(
                p.getContent().stream().map(LivroDTO::fromEntity).toList(),
                p.getNumber(),
                p.getSize(),
                p.getTotalElements(),
                p.getTotalPages(),
                p.isFirst(),
                p.isLast());
    }

    @Transactional(readOnly = true)
    public List<LivroDTO> listarTodos() {
        return livroRepository.findAll(Sort.by("titulo")).stream().map(LivroDTO::fromEntity).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public LivroDTO buscarPorId(Long id) {
        Livro l = livroRepository.findById(id).orElseThrow(() -> new RuntimeException("Livro não encontrado"));
        return LivroDTO.fromEntity(l);
    }

    @Transactional(readOnly = true)
    public List<LivroDTO> estoqueCritico(int limite) {
        return livroRepository.findByEstoqueLessThanEqual(limite).stream().map(LivroDTO::fromEntity).collect(Collectors.toList());
    }

    @Transactional
    public LivroDTO criar(LivroDTO dto) {
        if (dto.getIsbn() != null && !dto.getIsbn().isBlank() && livroRepository.existsByIsbn(dto.getIsbn()))
            throw new RuntimeException("Já existe livro com este ISBN");
        Livro l = toEntity(dto, null);
        l = livroRepository.save(l);
        return LivroDTO.fromEntity(l);
    }

    @Transactional
    public LivroDTO atualizar(Long id, LivroDTO dto) {
        Livro l = livroRepository.findById(id).orElseThrow(() -> new RuntimeException("Livro não encontrado"));
        if (dto.getIsbn() != null && !dto.getIsbn().isBlank() && livroRepository.existsByIsbnAndIdNot(dto.getIsbn(), id))
            throw new RuntimeException("Já existe outro livro com este ISBN");
        toEntity(dto, l);
        l = livroRepository.save(l);
        return LivroDTO.fromEntity(l);
    }

    @Transactional
    public void excluir(Long id) {
        if (!livroRepository.existsById(id))
            throw new RuntimeException("Livro não encontrado");
        if (itemVendaRepository.countByLivroId(id) > 0)
            throw new RuntimeException("Este livro não pode ser excluído pois está vinculado a uma ou mais vendas.");
        livroRepository.deleteById(id);
    }

    private static final int MAX_VARCHAR = 255;

    private static String truncate(String value, int max) {
        if (value == null) return null;
        return value.length() <= max ? value : value.substring(0, max);
    }

    private Livro toEntity(LivroDTO dto, Livro existing) {
        Livro l = existing != null ? existing : new Livro();
        l.setTitulo(truncate(dto.getTitulo(), MAX_VARCHAR));
        l.setAutor(truncate(dto.getAutor(), MAX_VARCHAR));
        l.setEditora(truncate(dto.getEditora(), MAX_VARCHAR));
        l.setAno(dto.getAno());
        l.setPaginas(dto.getPaginas());
        l.setIsbn(truncate(dto.getIsbn(), MAX_VARCHAR));
        l.setPreco(dto.getPreco());
        l.setEstoque(dto.getEstoque() != null ? dto.getEstoque() : 0);
        l.setCategoria(truncate(dto.getCategoria(), MAX_VARCHAR));
        l.setDescricao(dto.getDescricao());
        // Evita erro "valor muito longo" se a coluna imagem_capa ainda for VARCHAR(255) no banco
        String img = dto.getImagemCapa();
        if (img == null || img.length() <= MAX_VARCHAR) {
            l.setImagemCapa(img);
        } else {
            // Imagem muito longa (ex.: base64): mantém a atual na edição ou não grava na criação
            if (existing != null) {
                l.setImagemCapa(existing.getImagemCapa());
            } else {
                l.setImagemCapa(null);
            }
        }
        l.setIdioma(truncate(dto.getIdioma(), MAX_VARCHAR));
        l.setEdicao(dto.getEdicao() != null ? dto.getEdicao() : 1);
        return l;
    }
}
