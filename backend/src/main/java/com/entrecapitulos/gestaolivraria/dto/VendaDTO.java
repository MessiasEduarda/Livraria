package com.entrecapitulos.gestaolivraria.dto;

import com.entrecapitulos.gestaolivraria.entity.Venda;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class VendaDTO {

    private Long id;
    private String date; // ISO string para frontend
    private Long clienteId;
    private String customer; // nome do cliente
    private String category;  // categoria predominante ou primeira
    private List<ItemVendaDTO> items;
    private BigDecimal total;
    private String status;    // completed, pending, cancelled
    private BigDecimal desconto;
    private String formaPagamento;
    private String observacoes;
    private Long vendedorId;
    private String seller;

    public static VendaDTO fromEntity(Venda v) {
        VendaDTO dto = new VendaDTO();
        dto.setId(v.getId());
        dto.setDate(v.getDataVenda() != null ? v.getDataVenda().format(DateTimeFormatter.ISO_DATE_TIME) : null);
        dto.setClienteId(v.getCliente().getId());
        dto.setCustomer(v.getCliente().getNome());
        if (v.getItens() != null && !v.getItens().isEmpty()) {
            dto.setCategory(v.getItens().get(0).getLivro().getCategoria());
            dto.setItems(v.getItens().stream().map(ItemVendaDTO::fromEntity).toList());
        }
        dto.setTotal(v.getTotal());
        dto.setStatus(v.getStatus() != null ? v.getStatus().name().toLowerCase() : null);
        dto.setDesconto(v.getDesconto());
        dto.setFormaPagamento(v.getFormaPagamento() != null ? v.getFormaPagamento().name().toLowerCase() : null);
        dto.setObservacoes(v.getObservacoes());
        if (v.getVendedor() != null) {
            dto.setVendedorId(v.getVendedor().getId());
            dto.setSeller(v.getVendedor().getNome());
        }
        return dto;
    }
}
