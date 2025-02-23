package com.home.home_bakery.orders.repositories.entities;

import com.home.home_bakery.inventory.repositories.entities.ProductType;
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
public class OrderDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private Double price;
    @OneToOne
    @JoinColumn(name = "product_type_id")
    private ProductType productType;
}
