package com.home.home_bakery.inventory.services;

import com.home.home_bakery.inventory.controller.dto.ProductDto;
import com.home.home_bakery.inventory.repositories.ProductRepository;
import com.home.home_bakery.inventory.repositories.ProductTypeRepository;
import com.home.home_bakery.inventory.repositories.entities.Product;
import com.home.home_bakery.inventory.repositories.entities.ProductType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductsServiceImpl implements ProductsService {
    private final ProductRepository productRepository;
    private final ProductTypeRepository productTypeRepository;

    @Override
    public List<ProductDto> getAllProducts() {
        try {
            List<Product> productEntities = productRepository.findAll();
            return toProductDtos(productEntities);
        } catch (Exception exception) {
            log.error("Error: {}", exception.getMessage());
            throw new RuntimeException("Failed to get all products");
        }
    }

    @Override
    public void saveProduct(ProductDto productDto) {
        try {
            Product product = toProductEntity(productDto);

            productRepository.save(product);
        } catch (Exception exception) {
            log.error("Error: {}", exception.getMessage());
            throw new RuntimeException("Failed to save a product");
        }
    }

    @Override
    public void deleteProductById(UUID id) {
        try {
            productRepository.deleteById(id);
        } catch (Exception exception) {
            log.error("Error{}: ", exception.getMessage());
            throw new RuntimeException("Failed to delete a product by id");
        }
    }

    private List<ProductDto> toProductDtos(List<Product> productEntities) {
        return productEntities.stream()
                .map(this::toProductDto)
                .toList();
    }

    private ProductDto toProductDto(Product productEntity) {
        return ProductDto.builder()
                .id(productEntity.getId())
                .brand(productEntity.getBrand())
                .description(productEntity.getDescription())
                .measurementUnit(productEntity.getMeasurementUnit())
                .barcode(productEntity.getBarcode())
                .weight(productEntity.getWeight())
                .validDays(productEntity.getValidDays())
                .productTypeId(productEntity.getProductType().getId())
                .productTypeName(productEntity.getProductType().getName())
                .build();
    }

    private Product toProductEntity(ProductDto productDto) {
        Product.ProductBuilder builder = Product.builder()
                .id(productDto.getId())
                .brand(productDto.getBrand())
                .description(productDto.getDescription())
                .measurementUnit(productDto.getMeasurementUnit())
                .barcode(productDto.getBarcode())
                .weight(productDto.getWeight())
                .validDays(productDto.getValidDays());

        if (Objects.isNull(productDto.getProductTypeId())) {
            ProductType productType = ProductType.builder()
                    .name(productDto.getProductTypeName())
                    .build();

            builder.productType(productType);
        } else {
            // ToDo maybe we should throw an exception when product type is not found?
            productTypeRepository.findById(productDto.getProductTypeId()).ifPresent(builder::productType);
        }

        return builder.build();
    }
}
