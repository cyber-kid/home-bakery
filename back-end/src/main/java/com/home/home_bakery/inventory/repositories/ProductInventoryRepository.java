package com.home.home_bakery.inventory.repositories;

import com.home.home_bakery.inventory.repositories.entities.ProductInventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProductInventoryRepository extends JpaRepository<ProductInventory, UUID> {
    List<ProductInventory> findAllByProductProductTypeId(UUID productTypeId);
}
