package com.entrecapitulos.gestaolivraria.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatsDTO {

    private long totalEmpresas;
    private long totalClientes;
    private long totalLivros;
    private long totalVendas;
}
