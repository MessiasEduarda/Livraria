package com.entrecapitulos.gestaolivraria.controller;

import com.entrecapitulos.gestaolivraria.dto.AdminStatsDTO;
import com.entrecapitulos.gestaolivraria.repository.ClienteRepository;
import com.entrecapitulos.gestaolivraria.repository.EmpresaRepository;
import com.entrecapitulos.gestaolivraria.repository.LivroRepository;
import com.entrecapitulos.gestaolivraria.repository.UsuarioRepository;
import com.entrecapitulos.gestaolivraria.repository.VendaRepository;
import com.entrecapitulos.gestaolivraria.service.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final CurrentUserService currentUserService;
    private final UsuarioRepository usuarioRepository;
    private final EmpresaRepository empresaRepository;
    private final ClienteRepository clienteRepository;
    private final LivroRepository livroRepository;
    private final VendaRepository vendaRepository;

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDTO> getStats() {
        if (!currentUserService.isSuperAdmin()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        long totalEmpresas = empresaRepository.count();
        long totalClientes = clienteRepository.count();
        long totalLivros = livroRepository.count();
        long totalVendas = vendaRepository.count();
        AdminStatsDTO dto = AdminStatsDTO.builder()
                .totalEmpresas(totalEmpresas)
                .totalClientes(totalClientes)
                .totalLivros(totalLivros)
                .totalVendas(totalVendas)
                .build();
        return ResponseEntity.ok(dto);
    }
}
