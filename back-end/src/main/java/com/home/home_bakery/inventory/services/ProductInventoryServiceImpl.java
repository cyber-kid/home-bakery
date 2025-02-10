package com.home.home_bakery.inventory.services;

import com.home.home_bakery.inventory.controller.dto.ProductInventoryDto;
import com.home.home_bakery.inventory.repositories.ProductInventoryRepository;
import com.home.home_bakery.inventory.repositories.ProductRepository;
import com.home.home_bakery.inventory.repositories.entities.ProductInventory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductInventoryServiceImpl implements ProductInventoryService {
    private final ProductInventoryRepository productInventoryRepository;
    private final ProductRepository productRepository;

    @Override
    public void addProductsToInventory(List<ProductInventoryDto> productInventoryDtoList) {
        try {
            List<ProductInventory> entities = productInventoryDtoList.stream()
                    .map(this::toProductInventoryEntity)
                    .toList();

            productInventoryRepository.saveAll(entities);
        } catch (Exception exception) {
            log.error("Error: {}", exception.getMessage());
            throw new RuntimeException("Failed to add a products to inventory");
        }
    }

    @Override
    public List<ProductInventoryDto> getAllProductsFromInventory() {
        try {
            List<ProductInventory> productInventoryList = productInventoryRepository.findAll();

            return productInventoryList.stream()
                    .map(this::toProductInventoryDto)
                    .toList();
        } catch (Exception exception) {
            log.error("Error: {}", exception.getMessage());
            throw new RuntimeException("Failed to get all products from inventory");
        }
    }

    private ProductInventoryDto toProductInventoryDto(ProductInventory entity) {
        return ProductInventoryDto.builder()
                .id(entity.getId())
                .price(entity.getPrice())
                .purchaseDate(entity.getPurchaseDate())
                .brand(entity.getProduct().getBrand())
                .description(entity.getProduct().getDescription())
                .measurementUnit(entity.getProduct().getMeasurementUnit())
                .weight(entity.getProduct().getWeight())
                .barcode(entity.getProduct().getBarcode())
                .productTypeName(entity.getProduct().getProductType().getName())
                .productTypeId(entity.getProduct().getProductType().getId())
                .product_id(entity.getProduct().getId())
                .validDays(entity.getProduct().getValidDays())
                .build();
    }

    private ProductInventory toProductInventoryEntity(ProductInventoryDto dto) {
        ProductInventory.ProductInventoryBuilder builder = ProductInventory.builder();
        builder.id(dto.getId())
                .price(dto.getPrice())
                .purchaseDate(dto.getPurchaseDate());

        // ToDo maybe we should throw an exception when product type is not found?
        productRepository.findById(dto.getProduct_id()).ifPresent(builder::product);

        return builder.build();
    }
}
