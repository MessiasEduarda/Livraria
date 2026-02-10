package com.entrecapitulos.gestaolivraria.repository;

import com.entrecapitulos.gestaolivraria.entity.Venda;
import com.entrecapitulos.gestaolivraria.entity.Venda.StatusVenda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface VendaRepository extends JpaRepository<Venda, Long>, JpaSpecificationExecutor<Venda> {

    List<Venda> findByVendedor_Id(Long vendedorId);

    @Query(value = "SELECT COALESCE(SUM(v.total), 0) FROM vendas v WHERE v.status = 'COMPLETED' AND (CAST(:dataInicio AS timestamp) IS NULL OR v.data_venda >= :dataInicio) AND (CAST(:dataFim AS timestamp) IS NULL OR v.data_venda <= :dataFim)", nativeQuery = true)
    BigDecimal receitaTotal(@Param("dataInicio") LocalDateTime dataInicio, @Param("dataFim") LocalDateTime dataFim);

    long countByStatus(StatusVenda status);

    @Query("SELECT v FROM Venda v JOIN FETCH v.cliente LEFT JOIN FETCH v.vendedor JOIN FETCH v.itens iv JOIN FETCH iv.livro WHERE v.dataVenda BETWEEN :inicio AND :fim ORDER BY v.dataVenda DESC")
    List<Venda> findByPeriodoComItens(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);

    @Query(value = "SELECT COALESCE(SUM(v.total), 0) FROM vendas v WHERE v.vendedor_id = :vendedorId AND v.status = 'COMPLETED' AND (CAST(:dataInicio AS timestamp) IS NULL OR v.data_venda >= :dataInicio) AND (CAST(:dataFim AS timestamp) IS NULL OR v.data_venda <= :dataFim)", nativeQuery = true)
    BigDecimal receitaTotalPorVendedor(@Param("vendedorId") Long vendedorId,
                                       @Param("dataInicio") LocalDateTime dataInicio,
                                       @Param("dataFim") LocalDateTime dataFim);
}
