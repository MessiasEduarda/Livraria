package com.entrecapitulos.gestaolivraria.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "clientes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String telefone;

    @Column(nullable = false, unique = true)
    private String cpf;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private StatusCliente status = StatusCliente.ACTIVE;

    @Column(name = "quantidade_compras")
    @Builder.Default
    private Integer quantidadeCompras = 0;

    @Column(name = "total_gasto", precision = 12, scale = 2)
    @Builder.Default
    private BigDecimal totalGasto = BigDecimal.ZERO;

    @Column(name = "data_cadastro")
    private LocalDate dataCadastro;

    @Column(name = "categoria_preferida")
    private String categoriaPreferida;

    private String endereco;
    private String cidade;
    private String estado;

    @Column(length = 10)
    private String cep;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum StatusCliente {
        ACTIVE, INACTIVE, VIP
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (dataCadastro == null) dataCadastro = LocalDate.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
