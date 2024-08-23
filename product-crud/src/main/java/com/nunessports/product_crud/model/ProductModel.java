package com.nunessports.product_crud.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "produto")
public class ProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    @Size (min = 1, max = 255, message = "o nome do produto deve ter entre 1 e 255 caracteres" )
    @NotBlank
    private String nome;

    private String descricao;

    @NotNull
    private Float preco;


}
