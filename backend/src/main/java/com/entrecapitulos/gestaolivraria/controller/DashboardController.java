package com.entrecapitulos.gestaolivraria.controller;

import com.entrecapitulos.gestaolivraria.dto.DashboardDTO;
import com.entrecapitulos.gestaolivraria.service.VendaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final VendaService vendaService;

    @GetMapping
    public ResponseEntity<DashboardDTO> dashboard(
            @RequestParam(defaultValue = "7") int dias,
            @RequestParam(defaultValue = "10") int estoqueCriticoLimite) {
        return ResponseEntity.ok(vendaService.dashboard(dias, estoqueCriticoLimite));
    }
}
