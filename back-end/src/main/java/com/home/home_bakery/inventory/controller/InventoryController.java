package com.home.home_bakery.inventory.controller;

import com.home.home_bakery.inventory.controller.dto.ProductInventoryDto;
import com.home.home_bakery.inventory.services.ProductInventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@CrossOrigin
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
    public List<ProductInventoryDto> getProductsFromInventory(@RequestParam(required = false) UUID productTypeId) {
        if (Objects.nonNull(productTypeId)) {
            return productInventoryService.getProductsInventoryByProductTypeId(productTypeId);
        } else {
            return productInventoryService.getAllProductsFromInventory();
        }
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteProductInventoryById(@PathVariable UUID id) {
        productInventoryService.deleteProductInventoryById(id);
    }
}
