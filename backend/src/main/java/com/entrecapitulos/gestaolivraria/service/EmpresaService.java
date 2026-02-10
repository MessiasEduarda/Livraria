package com.entrecapitulos.gestaolivraria.service;

import com.entrecapitulos.gestaolivraria.dto.EmpresaDTO;
import com.entrecapitulos.gestaolivraria.entity.Empresa;
import com.entrecapitulos.gestaolivraria.entity.Usuario;
import com.entrecapitulos.gestaolivraria.repository.ClienteRepository;
import com.entrecapitulos.gestaolivraria.repository.EmpresaRepository;
import com.entrecapitulos.gestaolivraria.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmpresaService {

    private final EmpresaRepository empresaRepository;
    private final UsuarioRepository usuarioRepository;
    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public List<EmpresaDTO> listar(boolean apenasAtivos) {
        List<Empresa> list = apenasAtivos
                ? empresaRepository.findByAtivoOrderByNomeAsc(true)
                : empresaRepository.findAllByOrderByNomeAsc();
        return list.stream()
                .map(e -> EmpresaDTO.fromEntityWithCounts(e, usuarioRepository.countByEmpresaId(e.getId()), clienteRepository.countByEmpresaId(e.getId())))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<EmpresaDTO> relatorio() {
        return listar(false);
    }

    @Transactional(readOnly = true)
    public EmpresaDTO buscarPorId(Long id) {
        Empresa e = empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));
        long totalUsuarios = usuarioRepository.countByEmpresaId(e.getId());
        long totalClientes = clienteRepository.countByEmpresaId(e.getId());
        return EmpresaDTO.fromEntityWithCounts(e, totalUsuarios, totalClientes);
    }

    @Transactional
    public EmpresaDTO criar(EmpresaDTO dto) {
        if (empresaRepository.existsByEmail(dto.getEmail()))
            throw new RuntimeException("Já existe empresa com este e-mail");
        if (usuarioRepository.existsByEmail(dto.getEmail()))
            throw new RuntimeException("Este e-mail já está em uso por outro usuário");
        if (dto.getSenha() == null || dto.getSenha().isBlank())
            throw new RuntimeException("Senha é obrigatória para criar o acesso da empresa");
        String cnpjDigits = dto.getCnpj() != null ? dto.getCnpj().replaceAll("\\D", "") : "";
        if (cnpjDigits.length() != 14)
            throw new RuntimeException("CNPJ é obrigatório e deve ter 14 dígitos");
        Empresa e = toEntity(dto, null);
        e = empresaRepository.save(e);
        Usuario usuario = Usuario.builder()
                .email(e.getEmail().trim().toLowerCase())
                .senha(passwordEncoder.encode(dto.getSenha()))
                .nome(e.getNome())
                .ehVendedor(false)
                .empresaId(e.getId())
                .roles(Set.of("EMPRESA"))
                .build();
        usuarioRepository.save(usuario);
        return EmpresaDTO.fromEntityWithCounts(e, 1L, 0L);
    }

    @Transactional
    public EmpresaDTO atualizar(Long id, EmpresaDTO dto) {
        Empresa e = empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));
        if (empresaRepository.existsByEmailAndIdNot(dto.getEmail(), id))
            throw new RuntimeException("Já existe outra empresa com este e-mail");
        String cnpjDigits = dto.getCnpj() != null ? dto.getCnpj().replaceAll("\\D", "") : "";
        if (cnpjDigits.length() != 14)
            throw new RuntimeException("CNPJ é obrigatório e deve ter 14 dígitos");
        toEntity(dto, e);
        e = empresaRepository.save(e);
        usuarioRepository.findByEmpresaIdAndRolesContaining(e.getId(), "EMPRESA").ifPresent(usuario -> {
            usuario.setNome(e.getNome());
            usuario.setEmail(e.getEmail().trim().toLowerCase());
            if (dto.getSenha() != null && !dto.getSenha().isBlank())
                usuario.setSenha(passwordEncoder.encode(dto.getSenha()));
            usuarioRepository.save(usuario);
        });
        long totalUsuarios = usuarioRepository.countByEmpresaId(e.getId());
        long totalClientes = clienteRepository.countByEmpresaId(e.getId());
        return EmpresaDTO.fromEntityWithCounts(e, totalUsuarios, totalClientes);
    }

    @Transactional
    public void desativar(Long id) {
        Empresa e = empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));
        e.setAtivo(false);
        empresaRepository.save(e);
    }

    @Transactional
    public void ativar(Long id) {
        Empresa e = empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));
        e.setAtivo(true);
        empresaRepository.save(e);
    }

    @Transactional
    public void excluir(Long id) {
        if (!empresaRepository.existsById(id))
            throw new RuntimeException("Empresa não encontrada");
        usuarioRepository.findByEmpresaIdAndRolesContaining(id, "EMPRESA").ifPresent(usuarioRepository::delete);
        empresaRepository.deleteById(id);
    }

    private Empresa toEntity(EmpresaDTO dto, Empresa existing) {
        Empresa e = existing != null ? existing : new Empresa();
        e.setNome(dto.getNome());
        e.setEmail(dto.getEmail());
        e.setCnpj(dto.getCnpj());
        e.setObservacoes(dto.getObservacoes());
        if (dto.getFormasPagamento() != null && !dto.getFormasPagamento().isEmpty()) {
            e.setFormasPagamento(String.join(",", dto.getFormasPagamento()));
        } else {
            e.setFormasPagamento("DINHEIRO,PIX,CREDITO,DEBITO");
        }
        if (dto.getPermissoes() != null && !dto.getPermissoes().isEmpty()) {
            e.setPermissoes(String.join(",", dto.getPermissoes()));
        } else {
            e.setPermissoes("LIVROS,ESTOQUE,VENDAS,CLIENTES,RELATORIOS,DASHBOARD,VENDEDORES,CONFIGURACOES");
        }
        if (existing == null) {
            e.setAtivo(true);
        } else {
            e.setAtivo(dto.isAtivo());
        }
        return e;
    }
}
