package com.foodflow.foodflow_backend.repository;
import com.foodflow.foodflow_backend.Entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
}