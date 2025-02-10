package com.home.home_bakery.orders.services;

import com.home.home_bakery.orders.controllers.dto.OrderDto;

import java.util.List;

public interface OrdersService {
    void saveOrder(OrderDto dto);

    List<OrderDto> getAllOrders();
}
