package com.entrecapitulos.gestaolivraria.service;

import com.entrecapitulos.gestaolivraria.dto.LoginRequest;
import com.entrecapitulos.gestaolivraria.dto.LoginResponse;
import com.entrecapitulos.gestaolivraria.entity.Empresa;
import com.entrecapitulos.gestaolivraria.entity.Usuario;
import com.entrecapitulos.gestaolivraria.repository.EmpresaRepository;
import com.entrecapitulos.gestaolivraria.repository.FaturaRepository;
import com.entrecapitulos.gestaolivraria.repository.UsuarioRepository;
import com.entrecapitulos.gestaolivraria.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final EmpresaRepository empresaRepository;
    private final FaturaRepository faturaRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getSenha()));
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        String token = jwtService.gerarToken(usuario.getEmail(), usuario.getRoles());
        boolean hasAdmin = usuario.getRoles() != null && usuario.getRoles().contains("ADMIN");
        boolean hasEmpresa = usuario.getRoles() != null && usuario.getRoles().contains("EMPRESA");
        boolean admin = hasAdmin || hasEmpresa;
        String tipoUsuario = hasAdmin ? "SUPER_ADMIN" : hasEmpresa ? "EMPRESA" : "VENDEDOR";
        boolean bloqueado = false;
        String mensagemBloqueio = null;
        List<String> permissoes = null;
        if (hasEmpresa && usuario.getEmpresaId() != null) {
            List<com.entrecapitulos.gestaolivraria.entity.Fatura> emAtraso = faturaRepository.findUnpaidOverdueByEmpresaId(usuario.getEmpresaId(), LocalDate.now());
            if (!emAtraso.isEmpty()) {
                bloqueado = true;
                mensagemBloqueio = "Pagamento pendente. Regularize sua fatura para acessar o sistema.";
            }
        }
        if (hasEmpresa && usuario.getEmpresaId() != null && !bloqueado) {
            Optional<Empresa> emp = empresaRepository.findById(usuario.getEmpresaId());
            if (emp.isPresent() && emp.get().getPermissoes() != null && !emp.get().getPermissoes().isBlank()) {
                permissoes = Stream.of(emp.get().getPermissoes().split(","))
                        .map(String::trim)
                        .filter(s -> !s.isEmpty())
                        .collect(Collectors.toList());
            } else {
                permissoes = List.of("LIVROS", "ESTOQUE", "VENDAS", "CLIENTES", "RELATORIOS", "DASHBOARD", "VENDEDORES", "CONFIGURACOES");
            }
        }
        return LoginResponse.builder()
                .token(token)
                .tipo("Bearer")
                .usuarioId(usuario.getId())
                .nome(usuario.getNome())
                .email(usuario.getEmail())
                .admin(admin)
                .tipoUsuario(tipoUsuario)
                .permissoes(permissoes)
                .bloqueado(bloqueado)
                .mensagemBloqueio(mensagemBloqueio)
                .build();
    }
}
