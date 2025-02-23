package com.home.home_bakery.orders.services;

import com.home.home_bakery.orders.controllers.dto.OrderDto;

import java.util.List;
import java.util.UUID;

public interface OrdersService {
    void saveOrder(OrderDto dto);

    List<OrderDto> getAllOrders();

    void deleteOrderById(UUID id);
}
