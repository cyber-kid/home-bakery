package com.home.home_bakery.inventory.services;

import com.home.home_bakery.inventory.controller.dto.ProductDto;

import java.util.List;
import java.util.UUID;

public interface ProductsService {
    List<ProductDto> getAllProducts();

    void saveProduct(ProductDto productDto);

    void deleteProductById(UUID id);
}
