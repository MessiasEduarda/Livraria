package com.entrecapitulos.gestaolivraria.service;

import com.entrecapitulos.gestaolivraria.dto.CriarFaturaRequest;
import com.entrecapitulos.gestaolivraria.dto.FaturaDTO;
import com.entrecapitulos.gestaolivraria.entity.Fatura;
import com.entrecapitulos.gestaolivraria.repository.EmpresaRepository;
import com.entrecapitulos.gestaolivraria.repository.FaturaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FaturaService {

    private final FaturaRepository faturaRepository;
    private final EmpresaRepository empresaRepository;

    @Transactional(readOnly = true)
    public List<FaturaDTO> listarPorEmpresa(Long empresaId) {
        if (empresaRepository.findById(empresaId).isEmpty())
            throw new RuntimeException("Empresa não encontrada");
        return faturaRepository.findByEmpresaIdOrderByDataVencimentoDesc(empresaId)
                .stream()
                .map(FaturaDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public FaturaDTO criar(Long empresaId, CriarFaturaRequest request) {
        if (empresaRepository.findById(empresaId).isEmpty())
            throw new RuntimeException("Empresa não encontrada");
        if (request.getValor() == null || request.getValor().signum() <= 0)
            throw new RuntimeException("Valor da fatura deve ser maior que zero");
        if (request.getDataVencimento() == null)
            throw new RuntimeException("Data de vencimento é obrigatória");
        Fatura f = Fatura.builder()
                .empresaId(empresaId)
                .valor(request.getValor())
                .dataVencimento(request.getDataVencimento())
                .pago(false)
                .observacoes(request.getObservacoes())
                .build();
        f = faturaRepository.save(f);
        return FaturaDTO.fromEntity(f);
    }

    @Transactional
    public FaturaDTO marcarComoPago(Long faturaId) {
        Fatura f = faturaRepository.findById(faturaId)
                .orElseThrow(() -> new RuntimeException("Fatura não encontrada"));
        f.setPago(true);
        f = faturaRepository.save(f);
        return FaturaDTO.fromEntity(f);
    }
}
