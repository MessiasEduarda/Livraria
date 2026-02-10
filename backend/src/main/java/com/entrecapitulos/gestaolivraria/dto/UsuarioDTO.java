package com.entrecapitulos.gestaolivraria.dto;

import com.entrecapitulos.gestaolivraria.entity.Usuario;
import lombok.Data;

@Data
public class UsuarioDTO {

    private Long id;
    private String nome;
    private String email;
    private boolean ehVendedor;

    public static UsuarioDTO fromEntity(Usuario u) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(u.getId());
        dto.setNome(u.getNome());
        dto.setEmail(u.getEmail());
        dto.setEhVendedor(u.isEhVendedor());
        return dto;
    }
}
