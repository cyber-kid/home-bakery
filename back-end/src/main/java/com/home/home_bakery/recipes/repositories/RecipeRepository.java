package com.home.home_bakery.recipes.repositories;

import com.home.home_bakery.recipes.repositories.entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RecipeRepository extends JpaRepository<Recipe, UUID> {
}
