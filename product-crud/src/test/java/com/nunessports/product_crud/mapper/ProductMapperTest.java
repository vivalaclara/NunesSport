package com.nunessports.product_crud.mapper;

import com.nunessports.product_crud.dto.ProductDTO;
import com.nunessports.product_crud.model.ProductModel;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ProductMapperTest {

    private ProductMapper productMapper;

    private ProductModel product;
    private ProductDTO productDTO;

    @BeforeEach
    void setUp() {
        productMapper = new ProductMapper();

        product = ProductModel.builder()
                .id(1L)
                .nome("Produto Teste")
                .codigo("123ABC")
                .descricao("Descrição do Produto Teste")
                .preco(100.0f)
                .build();

        productDTO = ProductDTO.builder()
                .id(1L)
                .nome("Produto Teste")
                .codigo("123ABC")
                .descricao("Descrição do Produto Teste")
                .preco(100.0f)
                .build();
    }

    @Test
    void testToDTO() {
        ProductDTO result = productMapper.toDTO(product);

        assertNotNull(result);
        assertEquals(product.getId(), result.getId());
        assertEquals(product.getNome(), result.getNome());
    }

    @Test
    void testToEntity() {
        ProductModel result = productMapper.toEntity(productDTO);

        assertNotNull(result);
        assertEquals(productDTO.getId(), result.getId());
        assertEquals(productDTO.getNome(), result.getNome());
    }
}