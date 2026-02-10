package com.entrecapitulos.gestaolivraria.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "empresas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String nome;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(length = 20)
    private String cnpj;

    @Column(nullable = false)
    @Builder.Default
    private boolean ativo = true;

    /** Formas de pagamento permitidas (ex: DINHEIRO,PIX,CREDITO,DEBITO) */
    @Column(name = "formas_pagamento", length = 500)
    private String formasPagamento;

    @Column(name = "data_cadastro")
    private java.time.LocalDate dataCadastro;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(length = 500)
    private String observacoes;

    /** Acessos permitidos (ex: LIVROS,ESTOQUE,VENDAS,CLIENTES,RELATORIOS,DASHBOARD,VENDEDORES,CONFIGURACOES) */
    @Column(length = 500)
    private String permissoes;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (dataCadastro == null) dataCadastro = java.time.LocalDate.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
