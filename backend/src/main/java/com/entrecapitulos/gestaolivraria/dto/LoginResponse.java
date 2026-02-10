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
    /** true = administrador ou empresa (acesso total à loja), false = vendedor */
    private boolean admin;
    /** SUPER_ADMIN = master do sistema, EMPRESA = admin da loja, VENDEDOR = vendedor */
    private String tipoUsuario;
    /** Para tipoUsuario EMPRESA: lista de acessos permitidos (LIVROS, ESTOQUE, VENDAS, etc.) */
    private java.util.List<String> permissoes;
    /** Se true, empresa está bloqueada por fatura em atraso */
    private boolean bloqueado;
    /** Mensagem exibida quando bloqueado (ex: "Pagamento pendente. Regularize sua fatura para acessar o sistema.") */
    private String mensagemBloqueio;
}
