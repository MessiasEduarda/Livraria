package com.entrecapitulos.gestaolivraria.repository;

import com.entrecapitulos.gestaolivraria.entity.Livro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LivroRepository extends JpaRepository<Livro, Long> {

    boolean existsByIsbn(String isbn);

    boolean existsByIsbnAndIdNot(String isbn, Long id);

    @Query("SELECT l FROM Livro l WHERE " +
            "(:busca IS NULL OR LOWER(l.titulo) LIKE LOWER(CONCAT('%', :busca, '%')) OR " +
            "LOWER(l.autor) LIKE LOWER(CONCAT('%', :busca, '%'))) AND " +
            "(:categoria IS NULL OR l.categoria = :categoria)")
    Page<Livro> filtrar(@Param("busca") String busca,
                        @Param("categoria") String categoria,
                        Pageable pageable);

    List<Livro> findByEstoqueLessThanEqual(Integer limite);

    boolean existsByCategoria(String categoria);
}
