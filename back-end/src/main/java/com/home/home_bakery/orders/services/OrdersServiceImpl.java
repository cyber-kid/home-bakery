package com.home.home_bakery.orders.services;

import com.home.home_bakery.inventory.repositories.ProductInventoryRepository;
import com.home.home_bakery.inventory.repositories.ProductTypeRepository;
import com.home.home_bakery.inventory.repositories.entities.ProductInventory;
import com.home.home_bakery.orders.controllers.dto.OrderDetailsDto;
import com.home.home_bakery.orders.controllers.dto.OrderDto;
import com.home.home_bakery.orders.repositories.OrdersRepository;
import com.home.home_bakery.orders.repositories.entities.Order;
import com.home.home_bakery.orders.repositories.entities.OrderDetails;
import com.home.home_bakery.recipes.repositories.RecipeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrdersServiceImpl implements OrdersService {
    private final OrdersRepository ordersRepository;
    private final RecipeRepository recipeRepository;
    private final ProductTypeRepository productTypeRepository;
    private final ProductInventoryRepository productInventoryRepository;

    @Override
    public void saveOrder(OrderDto dto) {
        try {
            log.info("Received dto: {}", dto);
            Order entity = toOrderEntity(dto);
//            log.info("Entity: {}", entity);

            dto.getOrderDetails()
                    .stream()
                    .flatMap(detail -> detail.getSelected().stream())
                    .forEach(selected -> {
                            ProductInventory productInventory = productInventoryRepository.findById(selected.getProductInventoryId()).orElseThrow(() -> new RuntimeException("Product with id: " + selected.getProductInventoryId() + " not found in inventory"));
                            Double remainingWeight = productInventory.getRemainingWeight();

                            double newRemainingWeight = remainingWeight - selected.getUsedWeight();
                            if (newRemainingWeight >=0) {
                                productInventory.setRemainingWeight(Math.round(newRemainingWeight * 100.0) / 100.0);

                                log.info("new product in inventory: {}", productInventory);
                                if (newRemainingWeight == 0) {
                                    productInventoryRepository.deleteById(selected.getProductInventoryId());
                                } else {
                                    productInventoryRepository.save(productInventory);
                                }
                            } else {
                                throw new RuntimeException("Not enough product in inventory");
                            }
                    });

            ordersRepository.save(entity);
        } catch (Exception exception) {
            exception.printStackTrace();
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

    @Override
    public void deleteOrderById(UUID id) {
        try {
            ordersRepository.deleteById(id);
        } catch (Exception exception) {
            log.error("Error: {}", exception.getMessage());
            throw new RuntimeException("Failed to delete an order with id: " + id);
        }
    }

    private OrderDto toOrderDto(Order entity) {
        String pattern = "dd-MM-yyyy";
        DateFormat df = new SimpleDateFormat(pattern);

        List<OrderDetailsDto> orderDetailsDtoList = entity.getOrderDetails().stream()
                .map(this::toOrderDetailsDto)
                .toList();

        return OrderDto.builder()
                .id(entity.getId())
                .price(entity.getPrice())
                .recipeName(entity.getRecipe().getName())
                .orderDetails(orderDetailsDtoList)
                .orderDate(df.format(entity.getOrderDate()))
                .build();
    }

    private OrderDetailsDto toOrderDetailsDto(OrderDetails entity) {
        return OrderDetailsDto.builder()
                .id(entity.getId())
                .productTypeId(entity.getProductType().getId())
                .productTypeName(entity.getProductType().getName())
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

        productTypeRepository.findById(dto.getProductTypeId()).ifPresentOrElse(builder::productType, () -> {
            throw new RuntimeException("Product type with the id " + dto.getProductTypeId() + " not found");
        });

        return builder.build();
    }
}
