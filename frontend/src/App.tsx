import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Home from "./Home/pages/Home";
import Collections from "./Collections/pages/Collections";

import NavBar from "./NavBar/NavBar";
import Checkout from "./Checkout/pages/Checkout";

export default function App() {
  return (
    <CartProvider>
      <NavBar />
      <main className="flex justify-center mx-5 my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />

          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </CartProvider>
  );
}
