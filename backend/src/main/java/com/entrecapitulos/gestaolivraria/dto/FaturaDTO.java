package com.entrecapitulos.gestaolivraria.dto;

import com.entrecapitulos.gestaolivraria.entity.Fatura;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FaturaDTO {

    private Long id;
    private Long empresaId;
    private BigDecimal valor;
    private LocalDate dataVencimento;
    private boolean pago;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String observacoes;

    public static FaturaDTO fromEntity(Fatura f) {
        if (f == null) return null;
        return FaturaDTO.builder()
                .id(f.getId())
                .empresaId(f.getEmpresaId())
                .valor(f.getValor())
                .dataVencimento(f.getDataVencimento())
                .pago(f.isPago())
                .createdAt(f.getCreatedAt())
                .updatedAt(f.getUpdatedAt())
                .observacoes(f.getObservacoes())
                .build();
    }
}
