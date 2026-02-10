package com.entrecapitulos.gestaolivraria.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private String token;
    private String tipo;
    private Long usuarioId;
    private String nome;
    private String email;
    /** true = administrador (acesso total), false = vendedor (acesso restrito) */
    private boolean admin;
}
