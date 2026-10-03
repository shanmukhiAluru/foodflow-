import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(food) {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.id === food.id
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === food.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    ...food,
                    quantity: 1
                }
            ];
        });
    }

    function increaseQuantity(foodId) {
        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.id === foodId
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        );
    }

    function decreaseQuantity(foodId) {
        setCartItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.id === foodId
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    function removeFromCart(foodId) {
        setCartItems((currentItems) =>
            currentItems.filter((item) => item.id !== foodId)
        );
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}