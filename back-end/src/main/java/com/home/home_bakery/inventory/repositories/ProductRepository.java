package com.home.home_bakery.inventory.repositories;

import com.home.home_bakery.inventory.repositories.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
}
