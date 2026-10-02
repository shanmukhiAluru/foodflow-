package com.foodflow.foodflow_backend.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.foodflow.foodflow_backend.DTO.FoodItemResponse;
import com.foodflow.foodflow_backend.DTO.FoodItemUpdateRequest;
import com.foodflow.foodflow_backend.Service.FoodItemService;
import org.springframework.web.bind.annotation.*;
import com.foodflow.foodflow_backend.DTO.FoodItemRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/api/v1/food-items")
@CrossOrigin(origins = "http://localhost:5173")
public class FoodController {

    private final FoodItemService foodItemService;

    public FoodController(FoodItemService foodItemService) {
        this.foodItemService = foodItemService;
    }

    @GetMapping
    public List<FoodItemResponse> getAllFoodItems() {
        return foodItemService.getAllFoodItems();
    }

    @GetMapping("/restaurant/{restaurantId}")
    public List<FoodItemResponse> getFoodByRestaurant(
            @PathVariable Long restaurantId) {

        return foodItemService.getFoodByRestaurant(restaurantId);
    }
    @PostMapping
    public FoodItemResponse createFoodItem(
            @Valid @RequestBody FoodItemRequest request) {

        return foodItemService.createFoodItem(request);
    }
    @PutMapping("/{foodItemId}")
    public FoodItemResponse updateFoodItem(
            @PathVariable Long foodItemId,
            @Valid @RequestBody FoodItemUpdateRequest request) {

        return foodItemService.updateFoodItem(foodItemId, request);
    }
    @DeleteMapping("/{foodItemId}")
    public void deleteFoodItem(@PathVariable Long foodItemId) {
        foodItemService.deleteFoodItem(foodItemId);
    }
    @GetMapping("/{foodItemId}")
    public FoodItemResponse getFoodItemById(
            @PathVariable Long foodItemId) {

        return foodItemService.getFoodItemById(foodItemId);
    }
}