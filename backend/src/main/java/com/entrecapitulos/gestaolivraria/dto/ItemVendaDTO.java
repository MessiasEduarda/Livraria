package com.entrecapitulos.gestaolivraria.dto;

import com.entrecapitulos.gestaolivraria.entity.ItemVenda;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ItemVendaDTO {

    private Long livroId;
    private String bookTitle; // para compatibilidade com frontend
    private String titulo;
    private String autor;
    private Integer quantidade;
    private BigDecimal price;   // unitário
    private BigDecimal precoUnitario;
    private BigDecimal subtotal;

    public static ItemVendaDTO fromEntity(ItemVenda iv) {
        ItemVendaDTO dto = new ItemVendaDTO();
        dto.setLivroId(iv.getLivro().getId());
        dto.setBookTitle(iv.getLivro().getTitulo());
        dto.setTitulo(iv.getLivro().getTitulo());
        dto.setAutor(iv.getLivro().getAutor());
        dto.setQuantidade(iv.getQuantidade());
        dto.setPrice(iv.getPrecoUnitario());
        dto.setPrecoUnitario(iv.getPrecoUnitario());
        dto.setSubtotal(iv.getSubtotal());
        return dto;
    }
}
