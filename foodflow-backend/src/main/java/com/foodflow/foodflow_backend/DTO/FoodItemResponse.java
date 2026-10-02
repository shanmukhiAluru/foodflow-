package com.foodflow.foodflow_backend.DTO;

public class FoodItemResponse {

    private Long id;
    private String name;
    private String description;
    private Double price;
    private Boolean available;

    private Long restaurantId;
    private String restaurantName;

    public FoodItemResponse() {
    }

    public FoodItemResponse(
            Long id,
            String name,
            String description,
            Double price,
            Boolean available,
            Long restaurantId,
            String restaurantName) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.available = available;
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }
}