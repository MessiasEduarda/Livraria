package com.entrecapitulos.gestaolivraria.service;

import com.entrecapitulos.gestaolivraria.entity.Usuario;
import com.entrecapitulos.gestaolivraria.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CurrentUserService {

    private final UsuarioRepository usuarioRepository;

    public Optional<Usuario> getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() == null) {
            return Optional.empty();
        }
        String email = auth.getName();
        return usuarioRepository.findByEmail(email);
    }

    public Optional<Long> getCurrentUserId() {
        return getCurrentUser().map(Usuario::getId);
    }

    public boolean isAdmin() {
        return getCurrentUser()
                .map(u -> u.getRoles() != null && u.getRoles().contains("ADMIN"))
                .orElse(false);
    }
}
