package com.home.home_bakery.inventory.services;

import com.home.home_bakery.inventory.controller.dto.ProductInventoryDto;

import java.util.List;

public interface ProductInventoryService {
    void addProductsToInventory(List<ProductInventoryDto> productInventoryDtoList);

    List<ProductInventoryDto> getAllProductsFromInventory();
}
