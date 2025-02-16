package com.home.home_bakery.orders.services;

import com.home.home_bakery.inventory.repositories.ProductRepository;
import com.home.home_bakery.orders.controllers.dto.OrderDetailsDto;
import com.home.home_bakery.orders.controllers.dto.OrderDto;
import com.home.home_bakery.orders.repositories.OrdersRepository;
import com.home.home_bakery.orders.repositories.entities.Order;
import com.home.home_bakery.orders.repositories.entities.OrderDetails;
import com.home.home_bakery.recipes.repositories.RecipeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrdersServiceImpl implements OrdersService {
    private final OrdersRepository ordersRepository;
    private final RecipeRepository recipeRepository;
    private final ProductRepository productRepository;

    @Override
    public void saveOrder(OrderDto dto) {
        try {
            Order entity = toOrderEntity(dto);
            ordersRepository.save(entity);
        } catch (Exception exception) {
            log.error("Error: {}", exception.getMessage());
            throw new RuntimeException("Failed to save an order");
        }
    }

    @Override
    public List<OrderDto> getAllOrders() {
        try {
            return ordersRepository.findAll().stream()
                    .map(this::toOrderDto)
                    .toList();
        } catch (Exception exception) {
            log.error("Error: {}", exception.getMessage());
            throw new RuntimeException("Failed to get all orders");
        }
    }

    private OrderDto toOrderDto(Order entity) {
        List<OrderDetailsDto> orderDetailsDtoList = entity.getOrderDetails().stream()
                .map(this::toOrderDetailsDto)
                .toList();

        return OrderDto.builder()
                .id(entity.getId())
                .price(entity.getPrice())
                .recipeName(entity.getRecipe().getName())
                .orderDetails(orderDetailsDtoList)
                .orderDate(entity.getOrderDate())
                .build();
    }

    private OrderDetailsDto toOrderDetailsDto(OrderDetails entity) {
        return OrderDetailsDto.builder()
                .id(entity.getId())
                .productBrand(entity.getProduct().getBrand())
                .productType(entity.getProduct().getProductType().getName())
                .price(entity.getPrice())
                .build();
    }

    private Order toOrderEntity(OrderDto dto) {
        Set<OrderDetails> orderDetails = dto.getOrderDetails().stream()
                .map(this::toOrderDetailsEntity)
                .collect(Collectors.toSet());

        Order.OrderBuilder builder = Order.builder()
                .orderDate(Date.from(Instant.now()))
                .price(dto.getPrice())
                .orderDetails(orderDetails);

        recipeRepository.findById(dto.getRecipeId()).ifPresentOrElse(builder::recipe, () -> {
            throw new RuntimeException("Recipe with the id " + dto.getRecipeId() + " not found");
        });

        return builder.build();
    }

    private OrderDetails toOrderDetailsEntity(OrderDetailsDto dto) {
        OrderDetails.OrderDetailsBuilder builder = OrderDetails.builder()
                .price(dto.getPrice());

        productRepository.findById(dto.getProductId()).ifPresentOrElse(builder::product, () -> {
            throw new RuntimeException("Product with the id " + dto.getProductId() + " not found");
        });

        return builder.build();
    }
}
