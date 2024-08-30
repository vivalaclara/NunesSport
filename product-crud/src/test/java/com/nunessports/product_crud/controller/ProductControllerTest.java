package com.nunessports.product_crud.controller;

import com.nunessports.product_crud.dto.ProductDTO;
import com.nunessports.product_crud.mapper.ProductMapper;
import com.nunessports.product_crud.model.ProductModel;
import com.nunessports.product_crud.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductControllerTest {

    @Mock
    private ProductService productService;

    @Mock
    private ProductMapper productMapper;

    @InjectMocks
    private ProductController productController;

    private ProductModel product;
    private ProductDTO productDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
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
    void testGetAllProducts() {
        List<ProductModel> productList = new ArrayList<>();
        productList.add(product);

        when(productService.getAllProducts()).thenReturn(productList);
        when(productMapper.toDTO(any(ProductModel.class))).thenReturn(productDTO);

        ResponseEntity<List<ProductDTO>> response = productController.getAllProducts();

        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(productService, times(1)).getAllProducts();
    }

    @Test
    void testGetProductById() {
        when(productService.getById(1L)).thenReturn(product);
        when(productMapper.toDTO(any(ProductModel.class))).thenReturn(productDTO);

        ResponseEntity<ProductDTO> response = productController.getProductById(1L);

        assertNotNull(response.getBody());
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(productService, times(1)).getById(1L);
    }

    @Test
    void testCreateProduct() {
        when(productService.createProduct(any(ProductModel.class))).thenReturn(product);
        when(productMapper.toDTO(any(ProductModel.class))).thenReturn(productDTO);
        when(productMapper.toEntity(any(ProductDTO.class))).thenReturn(product);

        ResponseEntity<ProductDTO> response = productController.createProduct(productDTO);

        assertNotNull(response.getBody());
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        verify(productService, times(1)).createProduct(any(ProductModel.class));
    }
}