package com.home.home_bakery.orders.repositories.entities;

import com.home.home_bakery.recipes.repositories.entities.Recipe;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name = "order_date")
    private Date orderDate;
    private Double price;
    @OneToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    private Set<OrderDetails> orderDetails;
}
