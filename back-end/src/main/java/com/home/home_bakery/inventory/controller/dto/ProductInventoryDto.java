package com.home.home_bakery.inventory.controller.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductInventoryDto {
    private UUID id;
    private Double price;
    private Date purchaseDate;
    private UUID product_id;
    private String brand;
    private MeasurementUnit measurementUnit;
    private Integer barcode;
    private Double weight;
    private Integer validDays;
    private String description;
    private String productTypeName;
    private UUID productTypeId;
}
