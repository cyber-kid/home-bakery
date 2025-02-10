package com.home.home_bakery.inventory.controller;

import com.home.home_bakery.inventory.controller.dto.ProductDto;
import com.home.home_bakery.inventory.services.ProductsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("products")
public class ProductsController {
    private final ProductsService productsService;

    @GetMapping
    public List<ProductDto> getProducts() {
        return productsService.getAllProducts();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void saveProduct(@RequestBody ProductDto productDto) {
        productsService.saveProduct(productDto);
    }

    @DeleteMapping("{id}")
    public void deleteProductById(@PathVariable UUID id) {
        productsService.deleteProductById(id);
    }
}
