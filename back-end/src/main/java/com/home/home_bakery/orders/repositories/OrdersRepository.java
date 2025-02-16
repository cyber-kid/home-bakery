package com.home.home_bakery.orders.repositories;

import com.home.home_bakery.orders.repositories.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrdersRepository extends JpaRepository<Order, UUID> {
}
