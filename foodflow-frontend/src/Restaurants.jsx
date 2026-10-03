import { useState } from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
import "./Restaurants.css";

import chickenBiryaniImg from "./images/chicken-hyderabadi-biryani.jpg";
import chicken65Img from "./images/chicken-65-.jpg";
import masalaDosaImg from "./images/masala dosa.png";
import vegBiryaniImg from "./images/vegetable-biryani.jpg";
import butterNaanImg from "./images/butter-naan.jpg";
import paneerMasalaImg from "./images/paneerbuttermasala.jpg";

function Restaurants() {

    const { addToCart, cartItems } = useCart();

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

    return (
        <div className="restaurant-page" style={{ backgroundColor: "#000000", color: "#FFD700", minHeight: "100vh", padding: "20px" }}>

            <h1 className="restaurant-title" style={{ color: "#FFD700" }}>
                Restaurants
            </h1>

            {/* VIEW CART */}
            <div
                style={{
                    textAlign: "center",
                    marginBottom: "20px"
                }}
            >
                <Link to="/cart">
                    <button style={{ backgroundColor: "transparent", color: "#FFD700", border: "1px solid #FFD700", padding: "8px 16px", cursor: "pointer" }}>
                        View Cart (
                        {cartItems.reduce(
                            (total, item) =>
                                total + item.quantity,
                            0
                        )}
                        )
                    </button>
                </Link>
            </div>

            {/* RESTAURANTS */}
            {restaurants.map((restaurant) => (

                <div
                    className="restaurant-card"
                    key={restaurant.id}
                    style={{ border: "1px solid #FFD700", padding: "15px", marginBottom: "15px", backgroundColor: "#000000" }}
                >

                    <h2 style={{ color: "#FFD700" }}>{restaurant.name}</h2>

                    <button
                        onClick={() => viewMenu(restaurant)}
                        style={{ backgroundColor: "transparent", color: "#FFD700", border: "1px solid #FFD700", padding: "6px 12px", cursor: "pointer" }}
                    >
                        View Menu
                    </button>

                    {/* MENU */}
                    {selectedRestaurant?.id === restaurant.id && (

                        <div className="menu" style={{ marginTop: "20px", borderTop: "1px dashed #FFD700", paddingTop: "15px" }}>

                            <h2 style={{ color: "#FFD700" }}>
                                {restaurant.name} Menu
                            </h2>

                            {loading && (
                                <p style={{ color: "#FFD700" }}>Loading menu...</p>
                            )}

                            {error && (
                                <p style={{ color: "#FFD700" }}>{error}</p>
                            )}

                            {!loading &&
                                !error &&
                                foodItems.length === 0 && (
                                    <p style={{ color: "#FFD700" }}>
                                        No food items available.
                                    </p>
                                )}

                            {/* FOOD ITEMS */}
                            {foodItems.map((food) => (

                                <div
                                    className="food-card"
                                    key={food.id}
                                    style={{ border: "1px solid #FFD700", padding: "10px", marginTop: "10px", backgroundColor: "#000000" }}
                                >

                                    {/* FOOD IMAGE */}
                                    {foodImages[food.name] && (

                                        <img
                                            src={foodImages[food.name]}
                                            alt={food.name}
                                            className="food-image"
                                        />

                                    )}

                                    {/* FOOD NAME */}
                                    <h3 style={{ color: "#FFD700" }}>{food.name}</h3>

                                    {/* DESCRIPTION */}
                                    <p className="food-description" style={{ color: "#FFD700" }}>
                                        {food.description ||
                                            "Freshly prepared dish"}
                                    </p>

                                    {/* PRICE + ADD CART */}
                                    <div className="food-bottom">

                                        <span className="food-price" style={{ color: "#FFD700" }}>
                                            ₹{food.price}
                                        </span>

                                        <button
                                            className="add-button"
                                            onClick={() =>
                                                addToCart(food)
                                            }
                                            disabled={!food.available}
                                            style={{ backgroundColor: "transparent", color: "#FFD700", border: "1px solid #FFD700", padding: "4px 8px", cursor: "pointer" }}
                                        >
                                            Add to Cart
                                        </button>

                                    </div>

                                    {/* AVAILABILITY */}
                                    <p
                                        style={{
                                            marginTop: "10px",
                                            fontSize: "14px",
                                            color: "#FFD700"
                                        }}
                                    >
                                        {food.available
                                            ? "● Available"
                                            : "○ Currently unavailable"}
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
