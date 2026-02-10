package com.entrecapitulos.gestaolivraria.repository;

import com.entrecapitulos.gestaolivraria.entity.ItemVenda;
import com.entrecapitulos.gestaolivraria.entity.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ItemVendaRepository extends JpaRepository<ItemVenda, Long> {

    long countByLivroId(Long livroId);

    @Query("SELECT iv.livro, SUM(iv.quantidade) FROM ItemVenda iv WHERE iv.venda.dataVenda BETWEEN :inicio AND :fim AND iv.venda.status = 'COMPLETED' " +
            "GROUP BY iv.livro ORDER BY SUM(iv.quantidade) DESC")
    List<Object[]> topLivrosVendidos(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim, org.springframework.data.domain.Pageable pageable);
}
