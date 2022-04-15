import React, { useState } from "react";
import { fakeData } from "../../fakeData/products";
import { addToDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

  const handleAddProduct = (product) => {
    const newCart = [...cart, product];
    setCart(newCart); 
    const sameProduct = cart.filter(pd => pd.key === product.key);
    const count = sameProduct.length;
    addToDb(product.key, count);
  }
  return (
    <div className="twin-container">
      <div className="product-container">
        {
          products.map(pd => <Product 
            showAddToCart={true}
            key = {pd.key}
            handleAddProduct = {handleAddProduct}
            product = {pd}></Product>)
        }
      </div>

      <div className="cart-container">
        <Cart cart = {cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
