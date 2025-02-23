package com.home.home_bakery.recipes.services;

import com.home.home_bakery.inventory.repositories.ProductTypeRepository;
import com.home.home_bakery.inventory.repositories.entities.ProductType;
import com.home.home_bakery.recipes.controller.dto.RecipeDto;
import com.home.home_bakery.recipes.controller.dto.RecipeDetailsDto;
import com.home.home_bakery.recipes.repositories.RecipeRepository;
import com.home.home_bakery.recipes.repositories.entities.Recipe;
import com.home.home_bakery.recipes.repositories.entities.RecipeDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService {
    private final RecipeRepository recipeRepository;
    private final ProductTypeRepository productTypeRepository;

    @Override
    public void saveRecipe(RecipeDto recipeDto) {
        try {
            Recipe recipe = toRecipeEntity(recipeDto);

            recipeRepository.save(recipe);
        } catch (Exception exception) {
            log.error("Error: {}", exception.getMessage());
            throw new RuntimeException("Failed to save a recipe");
        }
    }

    @Override
    public List<RecipeDto> getAllRecipes() {
        try {
            List<Recipe> recipes = recipeRepository.findAll();

            return recipes.stream().map(this::toRecipeDto).toList();
        } catch (Exception exception) {
            log.error("Error: " + exception.getMessage());
            throw new RuntimeException("Failed to get all recipes");
        }
    }

    @Override
    public void deleteRecipeById(UUID id) {
        try {
            recipeRepository.deleteById(id);
        } catch (Exception exception) {
            log.error("Error: {}", exception.getMessage());
            throw new RuntimeException("Failed to delete a recipe with id: " + id);
        }
    }

    private RecipeDto toRecipeDto(Recipe entity) {
        List<RecipeDetailsDto> recipeDetailsDtoList = entity.getRecipeDetails().stream()
                .map(this::toRecipeDetailsDtos)
                .toList();

        return RecipeDto.builder()
                .id(entity.getId())
                .description(entity.getDescription())
                .name(entity.getName())
                .recipeDetails(recipeDetailsDtoList)
                .build();
    }

    private RecipeDetailsDto toRecipeDetailsDtos(RecipeDetails entity) {
        return RecipeDetailsDto.builder()
                .id(entity.getId())
                .productTypeId(entity.getProductType().getId())
                .productTypeName(entity.getProductType().getName())
                .measurementUnit(entity.getMeasurementUnit())
                .weight(entity.getWeight())
                .build();
    }

    private Recipe toRecipeEntity(RecipeDto recipeDto) {
        Recipe recipe = Recipe.builder()
                .description(recipeDto.getDescription())
                .name(recipeDto.getName())
                .build();

        List<RecipeDetails> recipeDetailsList = recipeDto.getRecipeDetails().stream()
                .map(this::toRecipeDetailsEntity)
                .toList();

        recipe.setRecipeDetails(recipeDetailsList);

        return recipe;
    }

    private RecipeDetails toRecipeDetailsEntity(RecipeDetailsDto dto) {
        RecipeDetails.RecipeDetailsBuilder builder = RecipeDetails.builder();
        builder.weight(dto.getWeight());
        builder.measurementUnit(dto.getMeasurementUnit());

        if (Objects.isNull(dto.getProductTypeId())) {
            builder.productType(ProductType.builder().name(dto.getProductTypeName()).build());
        } else {
            productTypeRepository.findById(dto.getProductTypeId()).ifPresentOrElse(builder::productType, () -> {
                throw new RuntimeException("Product type with the id " + dto.getProductTypeId() + " not found");
            });
        }

        return builder.build();
    }
}
