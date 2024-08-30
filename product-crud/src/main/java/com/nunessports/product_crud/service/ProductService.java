package com.nunessports.product_crud.service;

import com.nunessports.product_crud.exception.ProductNotFoundException;
import com.nunessports.product_crud.model.ProductModel;
import com.nunessports.product_crud.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;


    // Criar novo produto
    public ProductModel createProduct(ProductModel product) {
        return productRepository.save(product);
    }

    // exibir todos os produtos
    public List<ProductModel> getAllProducts() {
        return productRepository.findAll();
    }

    // exibir produto por id
    public ProductModel getById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("não foi encontrado nenhum produto com esse id"));
    }
    //exibir produto por código
    public ProductModel getByCodigo(String codigo) {
        return productRepository.findByCodigo(codigo).orElseThrow(() -> new ProductNotFoundException("não foi encontrado nenhum produto com esse código"));
    }

    // editar produto
    public ProductModel updateProduct(Long id, ProductModel updatedProduct) {
        if (productRepository.existsById(id)) {
            updatedProduct.setId(id);
            return productRepository.save(updatedProduct);
        } else {
            throw new RuntimeException("Product not found with id " + id);
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
