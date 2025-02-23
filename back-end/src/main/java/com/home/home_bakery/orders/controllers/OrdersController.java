package com.home.home_bakery.orders.controllers;

import com.home.home_bakery.orders.controllers.dto.OrderDto;
import com.home.home_bakery.orders.services.OrdersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("orders")
@RequiredArgsConstructor
public class OrdersController {
    private final OrdersService ordersService;

    @GetMapping
    @ResponseBody
    public List<OrderDto> getAllOrders() {
        return ordersService.getAllOrders();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void saveOrder(@RequestBody OrderDto dto) {
        ordersService.saveOrder(dto);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteOrderById(@PathVariable UUID id) {
        ordersService.deleteOrderById(id);
    }
}
