package com.entrecapitulos.gestaolivraria.repository;

import com.entrecapitulos.gestaolivraria.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query(value = "SELECT COUNT(DISTINCT u.id) FROM usuarios u INNER JOIN usuario_roles ur ON ur.usuario_id = u.id WHERE ur.role = 'EMPRESA'", nativeQuery = true)
    long countUsuariosComRoleEmpresa();

    long countByEmpresaId(Long empresaId);

    Optional<Usuario> findByEmpresaIdAndRolesContaining(Long empresaId, String role);
}
