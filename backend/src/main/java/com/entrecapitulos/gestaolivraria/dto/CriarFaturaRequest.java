package com.entrecapitulos.gestaolivraria.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CriarFaturaRequest {
    private BigDecimal valor;
    private LocalDate dataVencimento;
    private String observacoes;
}
