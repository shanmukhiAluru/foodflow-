import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Restaurants from "./Restaurants";
import Cart from "./Cart";
import { CartProvider } from "./CartContext";

function Home() {
    return (
        <div style={{ backgroundColor: "#000000", color: "#FFD700", minHeight: "100vh", padding: "20px" }}>
            <h1 style={{ color: "#FFD700" }}>FoodFlow</h1>
            <p style={{ color: "#FFD700" }}>Order your favorite food</p>

            <Link to="/restaurants">
                <button style={{ backgroundColor: "transparent", color: "#FFD700", border: "1px solid #FFD700", padding: "8px 16px", cursor: "pointer", marginRight: "10px" }}>Browse Restaurants</button>
            </Link>

            <Link to="/cart">
                <button style={{ backgroundColor: "transparent", color: "#FFD700", border: "1px solid #FFD700", padding: "8px 16px", cursor: "pointer" }}>View Cart</button>
            </Link>
        </div>
    );
}

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/restaurants" element={<Restaurants />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
