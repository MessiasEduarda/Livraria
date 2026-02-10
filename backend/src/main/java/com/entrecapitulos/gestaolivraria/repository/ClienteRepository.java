package com.entrecapitulos.gestaolivraria.repository;

import com.entrecapitulos.gestaolivraria.entity.Cliente;
import com.entrecapitulos.gestaolivraria.entity.Cliente.StatusCliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    boolean existsByCpf(String cpf);

    boolean existsByCpfAndIdNot(String cpf, Long id);

    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Long id);

    /* CAST(:nome AS string) evita Hibernate/PostgreSQL inferir bytea e erro "lower(bytea)" */
    @Query("SELECT c FROM Cliente c WHERE " +
            "(:nome IS NULL OR LOWER(c.nome) LIKE LOWER(CONCAT('%', CAST(:nome AS string), '%'))) AND " +
            "(:status IS NULL OR c.status = :status) AND " +
            "(:categoria IS NULL OR c.categoriaPreferida = :categoria)")
    Page<Cliente> filtrar(@Param("nome") String nome,
                          @Param("status") StatusCliente status,
                          @Param("categoria") String categoria,
                          Pageable pageable);
}
