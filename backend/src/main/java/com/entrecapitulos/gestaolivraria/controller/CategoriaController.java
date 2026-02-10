package com.entrecapitulos.gestaolivraria.controller;

import com.entrecapitulos.gestaolivraria.entity.Categoria;
import com.entrecapitulos.gestaolivraria.service.CategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categorias")
@RequiredArgsConstructor
public class CategoriaController {

    private final CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<List<Categoria>> listar() {
        return ResponseEntity.ok(categoriaService.listarTodas());
    }

    @PostMapping
    public ResponseEntity<Categoria> criar(@RequestBody Map<String, String> body) {
        String nome = body != null ? body.get("nome") : null;
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaService.criar(nome));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        categoriaService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
