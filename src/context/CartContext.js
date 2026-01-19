import { type } from 'firebase/firestore/pipelines';
import React, { createContext, useContext, useEffect, useState } from 'react'

// Create Cart Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({children}) => {
    // Initialize cart from localStorage or empty array
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cartItems')
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            return []
        }
    })
    // Save to localStorage whenever cartItems changes
    useEffect(() => {
      try {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }, [cartItems])
    
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            // Check if item already exists in cart
            const existingItem = prevItems.find(item => item.id === product.id)

            if(existingItem) {
                // Increment quantity if item exists
                return prevItems.map(item =>
                    item.id === product.id ? {...item, quantity: item.quantity + 1} : item
                )
            } else {
                // Add new item with quantity 1
                return [...prevItems, {...product, quantity: 1}]
            }
        })
    }

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== productId))
    }

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems((prevItems) => 
            prevItems.map(item => item.id === productId ? {...item, quantity} : item

            )
       )
    }

      const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems')
  };

  const getCartTotal = () => {
     return cartItems.reduce((total, item) => {
  const priceValue = item.isSale ? item.discountedPrice : item.price;

   let price;
   if (typeof priceValue === 'number') {
    price = priceValue;
   } else if (typeof priceValue === 'string') {
    price = parseFloat(priceValue.replace(/[Rs.,\s]/g, ''));
   } else {
    return total;
   }

    const quantity = Number(item.quantity) || 1;

            if (isNaN(price)) return total;

            return total + price * quantity;
        }, 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
    value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
    }}
    >
        {children}
        </CartContext.Provider>
  )
}

// Custom hook to use cart
export const useCart = () => {
    const context = useContext(CartContext)
    if(!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
}