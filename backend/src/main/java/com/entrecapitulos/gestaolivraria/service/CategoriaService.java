package com.entrecapitulos.gestaolivraria.service;

import com.entrecapitulos.gestaolivraria.entity.Categoria;
import com.entrecapitulos.gestaolivraria.repository.CategoriaRepository;
import com.entrecapitulos.gestaolivraria.repository.LivroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;
    private final LivroRepository livroRepository;

    @Transactional(readOnly = true)
    public List<Categoria> listarTodas() {
        return categoriaRepository.findAllByOrderByNomeAsc();
    }

    @Transactional
    public Categoria criar(String nome) {
        if (nome == null || nome.isBlank())
            throw new RuntimeException("Nome da categoria é obrigatório.");
        if (categoriaRepository.findByNomeIgnoreCase(nome.trim()).isPresent())
            throw new RuntimeException("Já existe uma categoria com este nome.");
        Categoria c = Categoria.builder().nome(nome.trim()).build();
        return categoriaRepository.save(c);
    }

    @Transactional
    public void excluir(Long id) {
        Categoria c = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada."));
        if (livroRepository.existsByCategoria(c.getNome()))
            throw new RuntimeException("Esta categoria não pode ser excluída pois existem livros vinculados a ela.");
        categoriaRepository.deleteById(id);
    }
}
