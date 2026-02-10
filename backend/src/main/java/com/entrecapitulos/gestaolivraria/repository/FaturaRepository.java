package com.entrecapitulos.gestaolivraria.repository;

import com.entrecapitulos.gestaolivraria.entity.Fatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface FaturaRepository extends JpaRepository<Fatura, Long> {

    List<Fatura> findByEmpresaIdOrderByDataVencimentoDesc(Long empresaId);

    @Query("SELECT f FROM Fatura f WHERE f.empresaId = :empresaId AND f.pago = false AND f.dataVencimento < :hoje")
    List<Fatura> findUnpaidOverdueByEmpresaId(@Param("empresaId") Long empresaId, @Param("hoje") LocalDate hoje);
}
