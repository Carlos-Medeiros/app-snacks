import React from 'react';
import './App.css';
import Home from './Home';
import Routes from './Routes';
import { CartProvider } from "react-use-cart";

function App() {
  return (
    <CartProvider>
      <Home/>
    </CartProvider>
  );
}

export default App;
