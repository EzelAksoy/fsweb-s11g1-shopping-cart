import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);
  const addItem = (item) => {
    if (!cart.includes(item) === true) {
      setCart([...cart, item]);
    }
    // verilen itemi sepete ekleyin
  };
  const removeItem = (item) => {
    setCart([...cart.filter((i) => i.id !== item.id)]);
  };

  return (
    <div className="App">
      <CartContext.Provider value={{ cart, removeItem }}>
        {" "}
        <Navigation cart={cart} />
        {/* Routelar */}
        <ProductContext.Provider value={{ products, addItem }}>
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart cart={cart} />
            </Route>
          </main>
        </ProductContext.Provider>
      </CartContext.Provider>
    </div>
  );
}

export default App;
