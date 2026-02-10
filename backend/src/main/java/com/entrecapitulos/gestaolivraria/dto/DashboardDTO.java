package com.entrecapitulos.gestaolivraria.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class DashboardDTO {

    private BigDecimal receitaTotal;
    private Long vendasConcluidas;
    private BigDecimal ticketMedio;
    private Long totalItensVendidos;
    private List<Map<String, Object>> vendasPorDia;
    private List<Map<String, Object>> vendasPorCategoria;
    private List<Map<String, Object>> topProdutos;
    private List<LivroDTO> estoqueCritico;
}
