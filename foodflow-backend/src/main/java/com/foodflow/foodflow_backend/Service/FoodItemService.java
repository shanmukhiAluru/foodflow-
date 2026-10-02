package com.foodflow.foodflow_backend.Service;

import com.foodflow.foodflow_backend.DTO.FoodItemRequest;
import com.foodflow.foodflow_backend.DTO.FoodItemResponse;
import com.foodflow.foodflow_backend.DTO.FoodItemUpdateRequest;
import com.foodflow.foodflow_backend.Entity.FoodItem;
import com.foodflow.foodflow_backend.Entity.Restaurant;
import com.foodflow.foodflow_backend.exception.ResourceNotFoundException;
import com.foodflow.foodflow_backend.repository.FoodItemRepository;
import com.foodflow.foodflow_backend.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodItemService {

    private final FoodItemRepository foodItemRepository;
    private final RestaurantRepository restaurantRepository;

    public FoodItemService(FoodItemRepository foodItemRepository, RestaurantRepository restaurantRepository) {
        this.foodItemRepository = foodItemRepository;
        this.restaurantRepository = restaurantRepository;
    }

    public List<FoodItemResponse> getAllFoodItems() {

        return foodItemRepository.findAll()
                .stream()
                .map(foodItem -> new FoodItemResponse(
                        foodItem.getId(),
                        foodItem.getName(),
                        foodItem.getDescription(),
                        foodItem.getPrice(),
                        foodItem.getAvailable(),
                        foodItem.getRestaurant().getId(),
                        foodItem.getRestaurant().getName()
                ))
                .collect(Collectors.toList());
    }

    public List<FoodItemResponse> getFoodByRestaurant(Long restaurantId) {

        return foodItemRepository.findByRestaurant_Id(restaurantId)
                .stream()
                .map(foodItem -> new FoodItemResponse(
                        foodItem.getId(),
                        foodItem.getName(),
                        foodItem.getDescription(),
                        foodItem.getPrice(),
                        foodItem.getAvailable(),
                        foodItem.getRestaurant().getId(),
                        foodItem.getRestaurant().getName()
                ))
                .collect(Collectors.toList());
    }
    public FoodItemResponse createFoodItem(FoodItemRequest request) {

        FoodItem foodItem = new FoodItem();

        foodItem.setName(request.getName());
        foodItem.setDescription(request.getDescription());
        foodItem.setPrice(request.getPrice());
        foodItem.setAvailable(
                request.getAvailable() != null ? request.getAvailable() : true
        );

        Restaurant restaurant = restaurantRepository
                .findById(request.getRestaurantId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Restaurant not found with id: " + request.getRestaurantId()
                        )
                );
        foodItem.setRestaurant(restaurant);

        FoodItem savedFoodItem = foodItemRepository.save(foodItem);

        return new FoodItemResponse(
                savedFoodItem.getId(),
                savedFoodItem.getName(),
                savedFoodItem.getDescription(),
                savedFoodItem.getPrice(),
                savedFoodItem.getAvailable(),
                savedFoodItem.getRestaurant().getId(),
                savedFoodItem.getRestaurant().getName()
        );
    }
    public FoodItemResponse updateFoodItem(
            Long foodItemId,
            FoodItemUpdateRequest request) {

        FoodItem foodItem = foodItemRepository.findById(foodItemId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Food item not found with id: " + foodItemId
                        )
                );

        foodItem.setName(request.getName());
        foodItem.setDescription(request.getDescription());
        foodItem.setPrice(request.getPrice());
        foodItem.setAvailable(request.getAvailable());

        FoodItem updatedFoodItem = foodItemRepository.save(foodItem);

        return new FoodItemResponse(
                updatedFoodItem.getId(),
                updatedFoodItem.getName(),
                updatedFoodItem.getDescription(),
                updatedFoodItem.getPrice(),
                updatedFoodItem.getAvailable(),
                updatedFoodItem.getRestaurant().getId(),
                updatedFoodItem.getRestaurant().getName()
        );
    }
    public void deleteFoodItem(Long foodItemId) {

        FoodItem foodItem = foodItemRepository.findById(foodItemId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Food item not found with id: " + foodItemId
                        )
                );

        foodItemRepository.delete(foodItem);
    }
    public FoodItemResponse getFoodItemById(Long foodItemId) {

        FoodItem foodItem = foodItemRepository.findById(foodItemId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Food item not found with id: " + foodItemId
                        )
                );

        return new FoodItemResponse(
                foodItem.getId(),
                foodItem.getName(),
                foodItem.getDescription(),
                foodItem.getPrice(),
                foodItem.getAvailable(),
                foodItem.getRestaurant().getId(),
                foodItem.getRestaurant().getName()
        );
    }
}