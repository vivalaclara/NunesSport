package com.nunessports.product_crud.service;

import com.nunessports.product_crud.exception.ProductNotFoundException;
import com.nunessports.product_crud.model.ProductModel;
import com.nunessports.product_crud.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private ProductModel product;

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
    }

    @Test
    void testCreateProduct() {
        when(productRepository.save(any(ProductModel.class))).thenReturn(product);

        ProductModel createdProduct = productService.createProduct(product);

        assertNotNull(createdProduct);
        assertEquals(product.getNome(), createdProduct.getNome());
        verify(productRepository, times(1)).save(product);
    }

    @Test
    void testGetById() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        ProductModel foundProduct = productService.getById(1L);

        assertNotNull(foundProduct);
        assertEquals(product.getNome(), foundProduct.getNome());
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    void testGetById_ProductNotFound() {
        when(productRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ProductNotFoundException.class, () -> productService.getById(1L));
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    void testUpdateProduct() {
        when(productRepository.existsById(1L)).thenReturn(true);
        when(productRepository.save(any(ProductModel.class))).thenReturn(product);

        ProductModel updatedProduct = productService.updateProduct(1L, product);

        assertNotNull(updatedProduct);
        assertEquals(product.getNome(), updatedProduct.getNome());
        verify(productRepository, times(1)).existsById(1L);
        verify(productRepository, times(1)).save(product);
    }

    @Test
    void testDeleteProduct() {
        when(productRepository.existsById(1L)).thenReturn(true);

        productService.deleteProduct(1L);

        verify(productRepository, times(1)).existsById(1L);
        verify(productRepository, times(1)).deleteById(1L);
    }
}
