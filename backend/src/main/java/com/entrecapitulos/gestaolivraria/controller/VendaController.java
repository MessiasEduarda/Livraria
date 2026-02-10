package com.entrecapitulos.gestaolivraria.controller;

import com.entrecapitulos.gestaolivraria.dto.*;
import com.entrecapitulos.gestaolivraria.service.CurrentUserService;
import com.entrecapitulos.gestaolivraria.service.VendaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/vendas")
@RequiredArgsConstructor
public class VendaController {

    private final VendaService vendaService;
    private final CurrentUserService currentUserService;

    /** Aceita data só (yyyy-MM-dd) ou data+hora (ISO). */
    private static LocalDateTime parseDataInicio(String s) {
        if (s == null || s.isBlank()) return null;
        if (s.contains("T")) return LocalDateTime.parse(s, DateTimeFormatter.ISO_DATE_TIME);
        return LocalDate.parse(s, DateTimeFormatter.ISO_DATE).atStartOfDay();
    }

    private static LocalDateTime parseDataFim(String s) {
        if (s == null || s.isBlank()) return null;
        if (s.contains("T")) return LocalDateTime.parse(s, DateTimeFormatter.ISO_DATE_TIME);
        return LocalDate.parse(s, DateTimeFormatter.ISO_DATE).atTime(23, 59, 59, 999_000_000);
    }

    @GetMapping
    public ResponseEntity<PageResponse<VendaDTO>> listar(
            @RequestParam(required = false) String dataInicio,
            @RequestParam(required = false) String dataFim,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String categoria,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        LocalDateTime inicio = parseDataInicio(dataInicio);
        LocalDateTime fim = parseDataFim(dataFim);
        return ResponseEntity.ok(vendaService.listar(inicio, fim, status, categoria, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendaDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(vendaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<VendaDTO> criar(@Valid @RequestBody NovaVendaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vendaService.criar(request));
    }

    @PostMapping("/{id}/cancelar")
    public ResponseEntity<VendaDTO> cancelar(@PathVariable Long id) {
        return ResponseEntity.ok(vendaService.cancelar(id));
    }

    /** Resumo das vendas do vendedor logado no período (receita total, quantidade, ticket médio). */
    @GetMapping("/minhas/resumo")
    public ResponseEntity<MinhasVendasResumoDTO> minhasVendasResumo(
            @RequestParam(required = false) String dataInicio,
            @RequestParam(required = false) String dataFim,
            @RequestParam(required = false) String status) {
        Long vendedorId = currentUserService.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Usuário não autenticado"));
        return ResponseEntity.ok(vendaService.resumoMinhasVendas(vendedorId, parseDataInicio(dataInicio), parseDataFim(dataFim), status));
    }

    /** Vendas do vendedor logado (controle mensal/anual). Apenas vendedores veem suas próprias vendas. */
    @GetMapping("/minhas")
    public ResponseEntity<PageResponse<VendaDTO>> minhasVendas(
            @RequestParam(required = false) String dataInicio,
            @RequestParam(required = false) String dataFim,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Long vendedorId = currentUserService.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Usuário não autenticado"));
        return ResponseEntity.ok(vendaService.listarPorVendedor(vendedorId, parseDataInicio(dataInicio), parseDataFim(dataFim), status, page, size));
    }
}
