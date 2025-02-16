package com.home.home_bakery.inventory.repositories.entities;

import jakarta.persistence.*;
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
@Entity
public class ProductInventory {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private Double price;
    @Column(name = "purchase_date")
    private Date purchaseDate;
    @ManyToOne
    @JoinColumn(name="product_id", nullable=false)
    private Product product;
}
