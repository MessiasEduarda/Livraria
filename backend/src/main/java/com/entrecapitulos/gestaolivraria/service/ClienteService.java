package com.entrecapitulos.gestaolivraria.service;

import com.entrecapitulos.gestaolivraria.dto.ClienteDTO;
import com.entrecapitulos.gestaolivraria.dto.PageResponse;
import com.entrecapitulos.gestaolivraria.entity.Cliente;
import com.entrecapitulos.gestaolivraria.entity.Cliente.StatusCliente;
import com.entrecapitulos.gestaolivraria.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    @Transactional(readOnly = true)
    public PageResponse<ClienteDTO> listar(String nome, String status, String categoria, int page, int size) {
        StatusCliente statusEnum = status != null && !status.isBlank() ? StatusCliente.valueOf(status.toUpperCase()) : null;
        Pageable pageable = PageRequest.of(page, size, Sort.by("nome"));
        Page<Cliente> p = clienteRepository.filtrar(
                nome != null && !nome.isBlank() ? nome : null,
                statusEnum,
                categoria != null && !categoria.isBlank() ? categoria : null,
                pageable);
        return new PageResponse<>(
                p.getContent().stream().map(ClienteDTO::fromEntity).toList(),
                p.getNumber(),
                p.getSize(),
                p.getTotalElements(),
                p.getTotalPages(),
                p.isFirst(),
                p.isLast());
    }

    @Transactional(readOnly = true)
    public ClienteDTO buscarPorId(Long id) {
        Cliente c = clienteRepository.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        return ClienteDTO.fromEntity(c);
    }

    @Transactional
    public ClienteDTO criar(ClienteDTO dto) {
        if (clienteRepository.existsByCpf(dto.getCpf()))
            throw new RuntimeException("Já existe cliente com este CPF");
        if (clienteRepository.existsByEmail(dto.getEmail()))
            throw new RuntimeException("Já existe cliente com este e-mail");
        Cliente c = toEntity(dto, null);
        c = clienteRepository.save(c);
        return ClienteDTO.fromEntity(c);
    }

    @Transactional
    public ClienteDTO atualizar(Long id, ClienteDTO dto) {
        Cliente c = clienteRepository.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        if (clienteRepository.existsByCpfAndIdNot(dto.getCpf(), id))
            throw new RuntimeException("Já existe outro cliente com este CPF");
        if (clienteRepository.existsByEmailAndIdNot(dto.getEmail(), id))
            throw new RuntimeException("Já existe outro cliente com este e-mail");
        toEntity(dto, c);
        c = clienteRepository.save(c);
        return ClienteDTO.fromEntity(c);
    }

    @Transactional
    public void excluir(Long id) {
        if (!clienteRepository.existsById(id))
            throw new RuntimeException("Cliente não encontrado");
        clienteRepository.deleteById(id);
    }

    private Cliente toEntity(ClienteDTO dto, Cliente existing) {
        Cliente c = existing != null ? existing : new Cliente();
        c.setNome(dto.getNome());
        c.setEmail(dto.getEmail());
        c.setTelefone(dto.getTelefone());
        c.setCpf(dto.getCpf());
        if (dto.getStatus() != null && !dto.getStatus().isBlank())
            c.setStatus(StatusCliente.valueOf(dto.getStatus().toUpperCase()));
        c.setCategoriaPreferida(dto.getCategoriaPreferida());
        c.setEndereco(dto.getEndereco());
        c.setCidade(dto.getCidade());
        c.setEstado(dto.getEstado());
        c.setCep(dto.getCep());
        if (existing == null) {
            c.setQuantidadeCompras(dto.getQuantidadeCompras() != null ? dto.getQuantidadeCompras() : 0);
            c.setTotalGasto(dto.getTotalGasto() != null ? dto.getTotalGasto() : java.math.BigDecimal.ZERO);
        }
        return c;
    }
}
