package com.entrecapitulos.gestaolivraria.repository;

import com.entrecapitulos.gestaolivraria.entity.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Long id);

    List<Empresa> findAllByOrderByNomeAsc();

    List<Empresa> findByAtivoOrderByNomeAsc(boolean ativo);
}
