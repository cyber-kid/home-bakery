package com.home.home_bakery.inventory.controller.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductDto {
    private UUID id;
    private String brand;
    private MeasurementUnit measurementUnit;
    private String barcode;
    private Double weight;
    private Integer validDays;
    private String description;
    private UUID productTypeId;
    private String productTypeName;
}
