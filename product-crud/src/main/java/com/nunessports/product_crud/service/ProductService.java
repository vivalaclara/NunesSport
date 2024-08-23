package com.nunessports.product_crud.service;

import com.nunessports.product_crud.model.ProductModel;
import com.nunessports.product_crud.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Criar novo produto
    public ProductModel createProduct(ProductModel product) {
        return productRepository.save(product);
    }

    // exibir todos os produtos
    public List<ProductModel> getAllProducts() {
        return productRepository.findAll();
    }

    // exibir produto por código
    public Optional<ProductModel> getProductById(Long codigo) {
        return productRepository.findById(codigo);
    }

    // editar produto
    public ProductModel updateProduct(Long codigo, ProductModel updatedProduct) {
        if (productRepository.existsById(codigo)) {
            updatedProduct.setCodigo(codigo);
            return productRepository.save(updatedProduct);
        } else {
            throw new RuntimeException("Product not found with id " + codigo);
        }
    }

    // deletar produto
    public void deleteProduct(Long codigo) {
        if (productRepository.existsById(codigo)) {
            productRepository.deleteById(codigo);
        } else {
            throw new RuntimeException("Product not found with id " + codigo);
        }
    }
}
