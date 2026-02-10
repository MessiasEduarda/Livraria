package com.entrecapitulos.gestaolivraria.controller;

import com.entrecapitulos.gestaolivraria.dto.CriarVendedorRequest;
import com.entrecapitulos.gestaolivraria.dto.UsuarioDTO;
import com.entrecapitulos.gestaolivraria.entity.Usuario;
import com.entrecapitulos.gestaolivraria.repository.UsuarioRepository;
import com.entrecapitulos.gestaolivraria.service.CurrentUserService;
import com.entrecapitulos.gestaolivraria.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioService usuarioService;
    private final CurrentUserService currentUserService;

    @GetMapping("/vendedores")
    public ResponseEntity<List<UsuarioDTO>> listarVendedores() {
        List<Usuario> vendedores = usuarioRepository.findAll().stream()
                .filter(Usuario::isEhVendedor)
                .toList();
        return ResponseEntity.ok(vendedores.stream().map(UsuarioDTO::fromEntity).collect(Collectors.toList()));
    }

    @PostMapping("/vendedores")
    public ResponseEntity<?> criarVendedor(@Valid @RequestBody CriarVendedorRequest request) {
        if (!currentUserService.isAdmin()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Apenas administradores podem cadastrar vendedores.");
        }
        try {
            UsuarioDTO created = usuarioService.criarVendedor(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/vendedores/{id}")
    public ResponseEntity<?> excluirVendedor(@PathVariable Long id) {
        if (!currentUserService.isAdmin()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Apenas administradores podem excluir vendedores.");
        }
        try {
            usuarioService.excluirVendedor(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
