package com.nunessports.product_crud.repository;

import com.nunessports.product_crud.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel,Long> {
}
