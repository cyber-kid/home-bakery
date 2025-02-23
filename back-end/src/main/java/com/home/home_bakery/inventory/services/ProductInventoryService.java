package com.home.home_bakery.inventory.services;

import com.home.home_bakery.inventory.controller.dto.ProductInventoryDto;

import java.util.List;
import java.util.UUID;

public interface ProductInventoryService {
    void addProductsToInventory(List<ProductInventoryDto> productInventoryDtoList);

    List<ProductInventoryDto> getAllProductsFromInventory();

    void deleteProductInventoryById(UUID id);

    List<ProductInventoryDto> getProductsInventoryByProductTypeId(UUID productTypeId);
}
