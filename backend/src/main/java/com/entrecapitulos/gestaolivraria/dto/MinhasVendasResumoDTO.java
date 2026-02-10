package com.entrecapitulos.gestaolivraria.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class MinhasVendasResumoDTO {

    private BigDecimal totalReceita;
    private long totalVendas;
    private BigDecimal ticketMedio;
}
