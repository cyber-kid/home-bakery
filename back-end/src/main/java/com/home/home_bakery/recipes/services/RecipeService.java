package com.home.home_bakery.recipes.services;

import com.home.home_bakery.recipes.controller.dto.RecipeDto;

import java.util.List;
import java.util.UUID;

public interface RecipeService {
    void saveRecipe(RecipeDto recipeDto);

    List<RecipeDto> getAllRecipes();

    void deleteRecipeById(UUID id);
}
