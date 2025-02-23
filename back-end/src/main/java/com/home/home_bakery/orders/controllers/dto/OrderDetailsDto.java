package com.home.home_bakery.orders.controllers.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderDetailsDto {
    private UUID id;
    private Double price;
    private UUID productTypeId;
    private String productTypeName;
    private List<InventorySelectionDto> selected;
}
