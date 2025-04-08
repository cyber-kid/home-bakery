package com.home.home_bakery.inventory.repositories.entities;

import com.home.home_bakery.inventory.controller.dto.MeasurementUnit;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String brand;
    @Column(name = "measurement_unit")
    private MeasurementUnit measurementUnit;
    private String barcode;
    private Double weight;
    @Column(name = "valid_days")
    private Integer validDays;
    private String description;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="product_type_id", nullable=false)
    private ProductType productType;
}
