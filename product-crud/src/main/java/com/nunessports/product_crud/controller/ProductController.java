package com.nunessports.product_crud.controller;

import com.nunessports.product_crud.model.ProductModel;
import com.nunessports.product_crud.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/products")
@Validated
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    @PostMapping
    public ResponseEntity<ProductModel> createProduct(@Valid @RequestBody ProductModel product) {
        ProductModel createdProduct = productService.createProduct(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }


    @GetMapping
    public ResponseEntity<List<ProductModel>> getAllProducts() {
        List<ProductModel> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }


    @GetMapping("/{codigo}")
    public ResponseEntity<ProductModel> getProductById(@PathVariable Long codigo) {
        Optional<ProductModel> product = productService.getProductById(codigo);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    @PutMapping("/{codigo}")
    public ResponseEntity<ProductModel> updateProduct(@PathVariable Long codigo, @Valid @RequestBody ProductModel updatedProduct) {
        try {
            ProductModel product = productService.updateProduct(codigo, updatedProduct);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @DeleteMapping("/{codigo}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long codigo) {
        try {
            productService.deleteProduct(codigo);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
