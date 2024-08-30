package com.nunessports.product_crud.mapper;

import com.nunessports.product_crud.dto.ProductDTO;
import com.nunessports.product_crud.model.ProductModel;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {
    public ProductDTO toDTO(ProductModel product) {
        return ProductDTO.builder()
                .id(product.getId())
                .nome(product.getNome())
                .codigo(product.getCodigo())
                .descricao(product.getDescricao())
                .preco(product.getPreco())
                .build();
    }

    public ProductModel toEntity(ProductDTO productDTO) {
        return ProductModel.builder()
                .id(productDTO.getId())
                .nome(productDTO.getNome())
                .codigo(productDTO.getCodigo())
                .descricao(productDTO.getDescricao())
                .preco(productDTO.getPreco())
                .build();
    }
}
