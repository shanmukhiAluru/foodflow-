import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Restaurants from "./Restaurants";
import { CartProvider } from "./CartContext";
import "./App.css"; // Ensures your dark styles are read by the components

function Home() {
    return (
        /* The app-container class stretches the home layout to match your restaurants page */
        <div className="app-container">
            <h1 className="app-header">FoodFlow</h1>
            <p className="app-subtitle">Order your favorite food</p>

            {/* The nav-bar layout aligns your buttons horizontally with clean spacing */}
            <div className="nav-bar">
                <Link to="/restaurants">
                    <button className="nav-button">Browse Restaurants</button>
                </Link>

                <button className="nav-button">View Cart</button>
            </div>
        </div>
    );
}

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                {/* Wraps all page transitions inside a full-bleed black background body */}
                <div style={{ backgroundColor: "#000000", minHeight: "100vh", width: "100%" }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/restaurants" element={<Restaurants />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
