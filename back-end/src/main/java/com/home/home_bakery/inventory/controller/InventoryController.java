package com.home.home_bakery.inventory.controller;

import com.home.home_bakery.inventory.controller.dto.ProductInventoryDto;
import com.home.home_bakery.inventory.services.ProductInventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("inventory")
@RequiredArgsConstructor
public class InventoryController {
    private final ProductInventoryService productInventoryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addProductsToInventory(@RequestBody List<ProductInventoryDto> productInventoryDtoList) {
        productInventoryService.addProductsToInventory(productInventoryDtoList);
    }

    @GetMapping
    @ResponseBody
    public List<ProductInventoryDto> getAllProductsFromInventory() {
        return productInventoryService.getAllProductsFromInventory();
    }
}
