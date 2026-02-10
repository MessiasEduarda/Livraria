package com.entrecapitulos.gestaolivraria.dto;

import com.entrecapitulos.gestaolivraria.entity.Cliente;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
public class ClienteDTO {

    private Long id;
    @NotBlank(message = "Nome é obrigatório")
    private String nome;
    @NotBlank @Email
    private String email;
    @NotBlank(message = "Telefone é obrigatório")
    private String telefone;
    @NotBlank(message = "CPF é obrigatório")
    private String cpf;
    private String status; // active, inactive, vip
    private Integer quantidadeCompras;
    private BigDecimal totalGasto;
    private String dataCadastro;
    private String categoriaPreferida;
    private String endereco;
    private String cidade;
    private String estado;
    private String cep;

    public static ClienteDTO fromEntity(Cliente c) {
        ClienteDTO dto = new ClienteDTO();
        dto.setId(c.getId());
        dto.setNome(c.getNome());
        dto.setEmail(c.getEmail());
        dto.setTelefone(c.getTelefone());
        dto.setCpf(c.getCpf());
        dto.setStatus(c.getStatus() != null ? c.getStatus().name().toLowerCase() : null);
        dto.setQuantidadeCompras(c.getQuantidadeCompras());
        dto.setTotalGasto(c.getTotalGasto());
        dto.setDataCadastro(c.getDataCadastro() != null ? c.getDataCadastro().format(DateTimeFormatter.ISO_LOCAL_DATE) : null);
        dto.setCategoriaPreferida(c.getCategoriaPreferida());
        dto.setEndereco(c.getEndereco());
        dto.setCidade(c.getCidade());
        dto.setEstado(c.getEstado());
        dto.setCep(c.getCep());
        return dto;
    }
}
