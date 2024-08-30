package com.nunessports.product_crud.controller;

import com.nunessports.product_crud.model.ProductModel;
import com.nunessports.product_crud.dto.ProductDTO;
import com.nunessports.product_crud.mapper.ProductMapper;
import com.nunessports.product_crud.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductMapper productMapper;

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts().stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductModel product = productService.getById(id);
        return ResponseEntity.ok(productMapper.toDTO(product));
    }

    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<ProductDTO> getProductByCode(@PathVariable String codigo) {
        ProductModel product = productService.getByCodigo(codigo);
        return ResponseEntity.ok(productMapper.toDTO(product));
    }


    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO productDTO) {
        ProductModel product = productService.createProduct(productMapper.toEntity(productDTO));
        return new ResponseEntity<>(productMapper.toDTO(product), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id, @Valid @RequestBody ProductDTO productDTO) {
        ProductModel product = productService.updateProduct(id, productMapper.toEntity(productDTO));
        return ResponseEntity.ok(productMapper.toDTO(product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
