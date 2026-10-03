import { useCart } from "./CartContext";

function Cart() {
    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    } = useCart();

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="cart-page" style={{ backgroundColor: "#000000", color: "#FFD700", minHeight: "100vh", padding: "20px" }}>

            <h1 style={{ color: "#FFD700" }}>Your Cart</h1>

            {cartItems.length === 0 ? (
                <p style={{ color: "#FFD700" }}>Your cart is empty.</p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.id} style={{ border: "1px solid #FFD700", padding: "15px", marginBottom: "15px", backgroundColor: "#000000" }}>

                            <h2 style={{ color: "#FFD700" }}>{item.name}</h2>

                            <p style={{ color: "#FFD700" }}>Price: ₹{item.price}</p>

                            <div>
                                <button
                                    onClick={() =>
                                        decreaseQuantity(item.id)
                                    }
                                    style={{ backgroundColor: "transparent", color: "#FFD700", border: "1px solid #FFD700", padding: "4px 10px", cursor: "pointer" }}
                                >
                                    -
                                </button>

                                <span style={{ margin: "0 15px", color: "#FFD700" }}>
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        increaseQuantity(item.id)
                                    }
                                    style={{ backgroundColor: "transparent", color: "#FFD700", border: "1px solid #FFD700", padding: "4px 10px", cursor: "pointer" }}
                                >
                                    +
                                </button>
                            </div>

                            <p style={{ color: "#FFD700" }}>
                                Item Total: ₹
                                {item.price * item.quantity}
                            </p>

                            <button
                                onClick={() =>
                                    removeFromCart(item.id)
                                }
                                style={{ backgroundColor: "transparent", color: "#FFD700", border: "1px solid #FFD700", padding: "6px 12px", cursor: "pointer", marginTop: "10px" }}
                            >
                                Remove
                            </button>

                        </div>
                    ))}

                    <hr style={{ borderColor: "#FFD700" }} />

                    <h2 style={{ color: "#FFD700" }}>Total: ₹{total}</h2>

                    <button style={{ backgroundColor: "transparent", color: "#FFD700", border: "1px solid #FFD700", padding: "10px 20px", cursor: "pointer", fontSize: "16px", marginTop: "10px" }}>
                        Proceed to Checkout
                    </button>
                </>
            )}

        </div>
    );
}

export default Cart;
