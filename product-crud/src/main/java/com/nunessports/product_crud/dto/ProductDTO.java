package com.nunessports.product_crud.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductDTO {
    private Long id;

    @NotBlank(message = "O código do produto é obrigatório")
    private String codigo;

    @NotBlank(message = "O nome do produto é obrigatório")
    @Size(min = 1, max = 255, message = "o nome do produto deve ter entre 1 e 255 caracteres")
    private String nome;

    private String descricao;

    @NotNull(message = "O preço do produto é obrigatório")
    @DecimalMin(value = "0.0", inclusive = false, message = "O preço do produto deve ser maior que zero")
    private Float preco;

}
