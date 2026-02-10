package com.entrecapitulos.gestaolivraria.service;

import com.entrecapitulos.gestaolivraria.dto.CriarVendedorRequest;
import com.entrecapitulos.gestaolivraria.dto.UsuarioDTO;
import com.entrecapitulos.gestaolivraria.entity.Usuario;
import com.entrecapitulos.gestaolivraria.entity.Venda;
import com.entrecapitulos.gestaolivraria.repository.UsuarioRepository;
import com.entrecapitulos.gestaolivraria.repository.VendaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final VendaRepository vendaRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UsuarioDTO criarVendedor(CriarVendedorRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Já existe um usuário com este e-mail.");
        }
        Usuario usuario = Usuario.builder()
                .nome(request.getNome().trim())
                .email(request.getEmail().trim().toLowerCase())
                .senha(passwordEncoder.encode(request.getSenha()))
                .ehVendedor(true)
                .roles(Set.of("USER"))
                .build();
        usuario = usuarioRepository.save(usuario);
        return UsuarioDTO.fromEntity(usuario);
    }

    @Transactional
    public void excluirVendedor(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vendedor não encontrado."));
        if (usuario.getRoles() != null && usuario.getRoles().contains("ADMIN")) {
            throw new IllegalArgumentException("Não é permitido excluir um administrador.");
        }
        List<Venda> vendas = vendaRepository.findByVendedor_Id(id);
        for (Venda v : vendas) {
            v.setVendedor(null);
        }
        vendaRepository.saveAll(vendas);
        usuarioRepository.delete(usuario);
    }
}
