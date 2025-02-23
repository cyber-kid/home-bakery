package com.home.home_bakery.inventory.services;

import com.home.home_bakery.inventory.controller.dto.ProductInventoryDto;
import com.home.home_bakery.inventory.repositories.ProductInventoryRepository;
import com.home.home_bakery.inventory.repositories.ProductRepository;
import com.home.home_bakery.inventory.repositories.entities.ProductInventory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.UUID;

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

    @Override
    public void deleteProductInventoryById(UUID id) {
        try {
            productInventoryRepository.deleteById(id);
        } catch (Exception exception) {
            log.error("Error: {}", exception.getMessage());
            throw new RuntimeException("Failed to delete a product from inventory with id: " + id);
        }
    }

    @Override
    public List<ProductInventoryDto> getProductsInventoryByProductTypeId(UUID productTypeId) {
        try {
            List<ProductInventory> productInventoryList = productInventoryRepository.findAllByProductProductTypeId(productTypeId);

            return productInventoryList.stream()
                    .map(this::toProductInventoryDto)
                    .toList();
        } catch (Exception exception) {
            log.error("Error: {}", exception.getMessage());
            throw new RuntimeException("Failed to get products from inventory with productTypeId: " + productTypeId);
        }
    }

    private ProductInventoryDto toProductInventoryDto(ProductInventory entity) {
        // ToDo move to the property file?
        String pattern = "dd-MM-yyyy";
        DateFormat df = new SimpleDateFormat(pattern);

        return ProductInventoryDto.builder()
                .id(entity.getId())
                .price(entity.getPrice())
                .purchaseDate(df.format(entity.getPurchaseDate()))
                .brand(entity.getProduct().getBrand())
                .description(entity.getProduct().getDescription())
                .measurementUnit(entity.getProduct().getMeasurementUnit())
                .weight(entity.getProduct().getWeight())
                .remainingWeight(entity.getRemainingWeight())
                .barcode(entity.getProduct().getBarcode())
                .productTypeName(entity.getProduct().getProductType().getName())
                .productTypeId(entity.getProduct().getProductType().getId())
                .productId(entity.getProduct().getId())
                .validDays(entity.getProduct().getValidDays())
                .build();
    }

    private ProductInventory toProductInventoryEntity(ProductInventoryDto dto) {
        ProductInventory.ProductInventoryBuilder builder = ProductInventory.builder();
        builder.id(dto.getId())
                .price(dto.getPrice())
                .purchaseDate(Date.from(Instant.now()));

        // ToDo maybe we should throw an exception when product type is not found?
        productRepository.findById(dto.getProductId()).ifPresent(product -> builder.product(product).remainingWeight(product.getWeight()));

        return builder.build();
    }
}
