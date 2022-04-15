import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';

function App() {
  
  return (
    <div>
    <Header></Header>

      <BrowserRouter>
        <Routes>
          <Route path="/shop" element={<Shop />}/>
          <Route path="/review" element={<Review />}/>
          <Route path="/inventory" element={<Inventory />}/>
          <Route path="/" element={<Shop />}/>
          <Route path="/product/:productKey" element={<ProductDetail />}/>
          <Route path="*" element={<NotFound />}/>
          
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
