package com.home.home_bakery.recipes.repositories.entities;

import com.home.home_bakery.inventory.controller.dto.MeasurementUnit;
import com.home.home_bakery.inventory.repositories.entities.ProductType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecipeDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_type_id")
    private ProductType productType;
    private Double weight;
    @Column(name = "measurement_unit")
    private MeasurementUnit measurementUnit;
}
