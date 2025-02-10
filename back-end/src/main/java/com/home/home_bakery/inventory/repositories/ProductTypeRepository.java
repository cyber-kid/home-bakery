package com.home.home_bakery.inventory.repositories;

import com.home.home_bakery.inventory.repositories.entities.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProductTypeRepository extends JpaRepository<ProductType, UUID> {
}
