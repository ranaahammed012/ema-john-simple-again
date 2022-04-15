import React, { useEffect, useState } from 'react';
import { fakeData } from '../../fakeData/products';
import { getStoredCart } from '../../utilities/fakedb';

const Review = () => {

  const [cart, setCart] = useState([]);
  useEffect( () => {
    //cart
    const savedCart = getStoredCart();
    const productKeys = Object.keys(savedCart);

    const cartProducts = productKeys.map(key => {
      const product = fakeData.find(pd => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, [])
  return (
    <div>
      <h1>Cart Items: {cart.length}</h1>
    </div>
  );
};

export default Review;