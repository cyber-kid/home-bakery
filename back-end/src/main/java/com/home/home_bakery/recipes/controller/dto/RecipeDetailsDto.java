package com.home.home_bakery.recipes.controller.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.home.home_bakery.inventory.controller.dto.MeasurementUnit;
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
public class RecipeDetailsDto {
    private UUID id;
    private UUID productTypeId;
    private Double weight;
    private String productTypeName;
    private MeasurementUnit measurementUnit;
}
