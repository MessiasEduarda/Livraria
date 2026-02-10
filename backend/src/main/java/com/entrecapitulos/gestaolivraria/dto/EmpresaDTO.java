package com.entrecapitulos.gestaolivraria.dto;

import com.entrecapitulos.gestaolivraria.entity.Empresa;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmpresaDTO {

    private Long id;
    private String nome;
    private String email;
    private String cnpj;
    private boolean ativo;
    private List<String> formasPagamento;
    private LocalDate dataCadastro;
    private LocalDateTime createdAt;
    private String observacoes;
    private Long totalUsuarios;
    private Long totalClientes;
    /** Apenas para criação: senha do usuário de acesso da empresa (não retornado na leitura) */
    private String senha;
    /** Acessos permitidos: LIVROS, ESTOQUE, VENDAS, etc. */
    private List<String> permissoes;

    public static EmpresaDTO fromEntity(Empresa e) {
        if (e == null) return null;
        List<String> formas = e.getFormasPagamento() != null && !e.getFormasPagamento().isBlank()
                ? Arrays.stream(e.getFormasPagamento().split(",")).map(String::trim).filter(s -> !s.isEmpty()).collect(Collectors.toList())
                : Collections.emptyList();
        List<String> perms = e.getPermissoes() != null && !e.getPermissoes().isBlank()
                ? Arrays.stream(e.getPermissoes().split(",")).map(String::trim).filter(s -> !s.isEmpty()).collect(Collectors.toList())
                : Collections.emptyList();
        return EmpresaDTO.builder()
                .id(e.getId())
                .nome(e.getNome())
                .email(e.getEmail())
                .cnpj(e.getCnpj())
                .ativo(e.isAtivo())
                .formasPagamento(formas)
                .dataCadastro(e.getDataCadastro())
                .createdAt(e.getCreatedAt())
                .observacoes(e.getObservacoes())
                .permissoes(perms)
                .build();
    }

    public static EmpresaDTO fromEntityWithCounts(Empresa e, long totalUsuarios, long totalClientes) {
        EmpresaDTO dto = fromEntity(e);
        if (dto != null) {
            dto.setTotalUsuarios(totalUsuarios);
            dto.setTotalClientes(totalClientes);
        }
        return dto;
    }
}
