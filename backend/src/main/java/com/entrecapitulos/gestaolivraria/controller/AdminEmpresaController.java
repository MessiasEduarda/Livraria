package com.entrecapitulos.gestaolivraria.controller;

import com.entrecapitulos.gestaolivraria.dto.CriarFaturaRequest;
import com.entrecapitulos.gestaolivraria.dto.EmpresaDTO;
import com.entrecapitulos.gestaolivraria.dto.FaturaDTO;
import com.entrecapitulos.gestaolivraria.service.CurrentUserService;
import com.entrecapitulos.gestaolivraria.service.EmpresaService;
import com.entrecapitulos.gestaolivraria.service.FaturaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/empresas")
@RequiredArgsConstructor
public class AdminEmpresaController {

    private final CurrentUserService currentUserService;
    private final EmpresaService empresaService;
    private final FaturaService faturaService;

    private ResponseEntity<?> forbid() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @GetMapping
    public ResponseEntity<?> listar(@RequestParam(required = false, defaultValue = "false") boolean apenasAtivos) {
        if (!currentUserService.isSuperAdmin()) return forbid();
        List<EmpresaDTO> list = empresaService.listar(apenasAtivos);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/relatorio")
    public ResponseEntity<?> relatorio() {
        if (!currentUserService.isSuperAdmin()) return forbid();
        List<EmpresaDTO> list = empresaService.relatorio();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        if (!currentUserService.isSuperAdmin()) return forbid();
        try {
            EmpresaDTO dto = empresaService.buscarPorId(id);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("mensagem", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody EmpresaDTO dto) {
        if (!currentUserService.isSuperAdmin()) return forbid();
        try {
            EmpresaDTO criada = empresaService.criar(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(criada);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("mensagem", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody EmpresaDTO dto) {
        if (!currentUserService.isSuperAdmin()) return forbid();
        try {
            dto.setId(id);
            EmpresaDTO atualizada = empresaService.atualizar(id, dto);
            return ResponseEntity.ok(atualizada);
        } catch (RuntimeException e) {
            if ("Empresa não encontrada".equals(e.getMessage()))
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("mensagem", e.getMessage()));
            return ResponseEntity.badRequest().body(Map.of("mensagem", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/ativar")
    public ResponseEntity<?> ativar(@PathVariable Long id) {
        if (!currentUserService.isSuperAdmin()) return forbid();
        try {
            empresaService.ativar(id);
            return ResponseEntity.ok(Map.of("mensagem", "Empresa ativada"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("mensagem", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/desativar")
    public ResponseEntity<?> desativar(@PathVariable Long id) {
        if (!currentUserService.isSuperAdmin()) return forbid();
        try {
            empresaService.desativar(id);
            return ResponseEntity.ok(Map.of("mensagem", "Empresa desativada"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("mensagem", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        if (!currentUserService.isSuperAdmin()) return forbid();
        try {
            empresaService.excluir(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("mensagem", e.getMessage()));
        }
    }

    @GetMapping("/{id}/faturas")
    public ResponseEntity<?> listarFaturas(@PathVariable Long id) {
        if (!currentUserService.isSuperAdmin()) return forbid();
        try {
            java.util.List<FaturaDTO> list = faturaService.listarPorEmpresa(id);
            return ResponseEntity.ok(list);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("mensagem", e.getMessage()));
        }
    }

    @PostMapping("/{id}/faturas")
    public ResponseEntity<?> gerarFatura(@PathVariable Long id, @RequestBody CriarFaturaRequest request) {
        if (!currentUserService.isSuperAdmin()) return forbid();
        try {
            FaturaDTO dto = faturaService.criar(id, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("mensagem", e.getMessage()));
        }
    }

    @PatchMapping("/{empresaId}/faturas/{faturaId}/pago")
    public ResponseEntity<?> marcarFaturaComoPaga(@PathVariable Long empresaId, @PathVariable Long faturaId) {
        if (!currentUserService.isSuperAdmin()) return forbid();
        try {
            FaturaDTO dto = faturaService.marcarComoPago(faturaId);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            if ("Fatura não encontrada".equals(e.getMessage()))
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("mensagem", e.getMessage()));
            return ResponseEntity.badRequest().body(Map.of("mensagem", e.getMessage()));
        }
    }
}
