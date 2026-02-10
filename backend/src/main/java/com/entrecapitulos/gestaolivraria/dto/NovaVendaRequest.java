package com.entrecapitulos.gestaolivraria.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class NovaVendaRequest {

    @NotNull(message = "Cliente é obrigatório")
    private Long clienteId;

    private Long vendedorId;

    @NotEmpty(message = "A venda deve ter pelo menos um item")
    @Valid
    private List<ItemVendaRequest> itens;

    private BigDecimal desconto = BigDecimal.ZERO;

    @NotNull
    private String formaPagamento; // dinheiro, debito, credito, pix

    private String observacoes;

    @Data
    public static class ItemVendaRequest {
        @NotNull
        private Long livroId;
        @NotNull
        private Integer quantidade;
    }
}
