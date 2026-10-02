package com.foodflow.foodflow_backend.repository;

import com.foodflow.foodflow_backend.Entity.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {

    List<FoodItem> findByRestaurant_Id(Long restaurantId);

}