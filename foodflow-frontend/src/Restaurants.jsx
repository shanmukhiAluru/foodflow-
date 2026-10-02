import { useState } from "react";
import { useCart } from "./CartContext";
import "./Restaurants.css";

import chickenBiryaniImg from "./images/chicken-hyderabadi-biryani.jpg";
import chicken65Img from "./images/chicken-65-.jpg";
import masalaDosaImg from "./images/masala dosa.png";
import vegBiryaniImg from "./images/vegetable-biryani.jpg";
import butterNaanImg from "./images/butter-naan.jpg";
import paneerMasalaImg from "./images/paneerbuttermasala.jpg";

function Restaurants() {
    const { addToCart } = useCart();

    const foodImages = {
        "Chicken Biryani": chickenBiryaniImg,
        "Chicken 65": chicken65Img,
        "Masala Dosa": masalaDosaImg,
        "Veg Biryani": vegBiryaniImg,
        "Butter Naan": butterNaanImg,
        "Paneer Butter Masala": paneerMasalaImg
    };
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const restaurants = [
        { id: 1, name: "Paradise" },
        { id: 2, name: "Bawarchi" },
        { id: 3, name: "Spice Garden" }
    ];

    async function viewMenu(restaurant) {
        setSelectedRestaurant(restaurant);
        setFoodItems([]);
        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                `http://localhost:8080/api/v1/food-items/restaurant/${restaurant.id}`
            );

            if (!response.ok) {
                throw new Error("Unable to load menu");
            }

            const data = await response.json();
            setFoodItems(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    // UPDATED: Every key element below now has a className matching your CSS
    return (
        <div className="restaurant-page">
            <h1 className="restaurant-title">Restaurants</h1>

            {restaurants.map((restaurant) => (
                <div className="restaurant-card" key={restaurant.id}>
                    <h2>{restaurant.name}</h2>

                    <button onClick={() => viewMenu(restaurant)}>
                        View Menu
                    </button>

                    {/* NESTED DYNAMIC MENU: Displays right beneath the clicked restaurant card */}
                    {selectedRestaurant?.id === restaurant.id && (
                        <div className="menu">
                            <h2>{restaurant.name} Menu</h2>

                            {loading && <p>Loading menu...</p>}
                            {error && <p>{error}</p>}

                            {!loading && !error && foodItems.length === 0 && (
                                <p>No food items available.</p>
                            )}

                            {foodItems.map((food) => (
                                <div className="food-card" key={food.id}>

                                    {foodImages[food.name] && (
                                        <img
                                            src={foodImages[food.name]}
                                            alt={food.name}
                                            className="food-image"
                                        />
                                    )}

                                    <h3>{food.name}</h3>

                                    <p className="food-description">
                                        {food.description || "Freshly prepared dish"}
                                    </p>

                                    <div className="food-bottom">
                                        <span className="food-price">₹{food.price}</span>
                                        <button
                                            className="add-button"
                                            onClick={() => addToCart(food)}
                                            disabled={!food.available}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>

                                    <p style={{ marginTop: "10px", fontSize: "14px" }}>
                                        {food.available ? "● Available" : "○ Currently unavailable"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Restaurants;
