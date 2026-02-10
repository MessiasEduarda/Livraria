package com.entrecapitulos.gestaolivraria.dto;

import com.entrecapitulos.gestaolivraria.entity.Livro;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class LivroDTO {

    private Long id;
    @NotBlank(message = "Título é obrigatório")
    private String titulo;
    @NotBlank(message = "Autor é obrigatório")
    private String autor;
    private String editora;
    private Integer ano;
    private Integer paginas;
    private String isbn;
    @NotNull @DecimalMin("0")
    private BigDecimal preco;
    @NotNull @Min(0)
    private Integer estoque;
    @NotBlank(message = "Categoria é obrigatória")
    private String categoria;
    private String descricao;
    private String imagemCapa;
    private String idioma;
    private Integer edicao;

    public static LivroDTO fromEntity(Livro l) {
        LivroDTO dto = new LivroDTO();
        dto.setId(l.getId());
        dto.setTitulo(l.getTitulo());
        dto.setAutor(l.getAutor());
        dto.setEditora(l.getEditora());
        dto.setAno(l.getAno());
        dto.setPaginas(l.getPaginas());
        dto.setIsbn(l.getIsbn());
        dto.setPreco(l.getPreco());
        dto.setEstoque(l.getEstoque());
        dto.setCategoria(l.getCategoria());
        dto.setDescricao(l.getDescricao());
        dto.setImagemCapa(l.getImagemCapa());
        dto.setIdioma(l.getIdioma());
        dto.setEdicao(l.getEdicao());
        return dto;
    }
}
