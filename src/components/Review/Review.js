import React, { useEffect, useState } from 'react';
import { fakeData } from '../../fakeData/products';
import { deleteFromDb, getStoredCart } from '../../utilities/fakedb';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {

  const [cart, setCart] = useState([]);

  const removeProduct = (productKey) => {
    console.log("remove clicked", productKey);
    const newCart = cart.filter(pd => pd.key !== productKey);
    setCart(newCart);
    deleteFromDb(productKey);
  }

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
    <div className="twin-container">


      <div className="product-container">
      {
        cart.map(pd => <ReviewItem
           key = {pd.key}
           removeProduct = {removeProduct}
           product = {pd}></ReviewItem>)
      }
      </div>



      <div className="cart-container">
          
      </div>
      

    </div>
  );
};

export default Review;