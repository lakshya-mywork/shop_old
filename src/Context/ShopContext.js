import React, { createContext, useEffect, useState } from "react";
import all_product from "../Components/Assets/all_product";
import data from "../Components/Assets/data";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

  //const [products,setProducts] = useState([]);
  
  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    return cart;
  };

  const getDefaultWishlist = () => {
    let wishlist = {};
    for(let ind =0; ind < 300; ind++){
        wishlist[ind] = 0;
    }
    return wishlist;
}

  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [wishlistItems, setWishlistItems] = useState(getDefaultWishlist);

 

const addToWishlist = (itemId) => {
    setWishlistItems((prev) => ({...prev,[itemId]:prev[itemId]+1}));
   
}

const removeFromWishlist = (itemId) => {
    setWishlistItems((prev) => ({...prev,[itemId]:prev[itemId]-1}));
  
}    

const moveToBag = (itemId) => {
    setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}));
    
}

  
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.new_price;
      }
    }
    return totalAmount;
  };

  const getTotalCartItemsCount = () =>{
    let count =0;
    for(const item in cartItems){
        if(cartItems[item]>0)
        {
            count += cartItems[item];
        }
    }
    return count;
}

const getTotalWishlistItemsCount = () =>{
    let count =0;
    for(const item in wishlistItems){
        if(wishlistItems[item]>0)
        {
            count += wishlistItems[item];
        }
    }
    return count;
}

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    
  };

  const contextValue = {data,all_product, getTotalWishlistItemsCount,getTotalCartItemsCount,getTotalCartAmount,cartItems,addToCart,removeFromCart,addToWishlist,wishlistItems,moveToBag,removeFromWishlist};
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
