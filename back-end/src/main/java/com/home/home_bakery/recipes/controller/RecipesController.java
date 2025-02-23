package com.home.home_bakery.recipes.controller;

import com.home.home_bakery.recipes.controller.dto.RecipeDto;
import com.home.home_bakery.recipes.services.RecipeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("recipes")
public class RecipesController {
    private final RecipeService recipeService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void saveRecipe(@RequestBody RecipeDto recipeDto) {
        recipeService.saveRecipe(recipeDto);
    }

    @GetMapping
    @ResponseBody
    public List<RecipeDto> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @DeleteMapping("{id}")
    public void deleteRecipeById(@PathVariable UUID id) {
        recipeService.deleteRecipeById(id);
    }
}
