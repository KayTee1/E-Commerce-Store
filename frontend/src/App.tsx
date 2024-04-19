import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthContext } from "./context/AuthContext";

import Home from "./Home/pages/Home";
import Collections from "./Collections/pages/Collections";
import Checkout from "./Checkout/pages/Checkout";
import Login from "./Auth/pages/Login";
import Signup from "./Auth/pages/Signup";

import NavBar from "./NavBar/NavBar";
import ViewListings from "./Profile/pages/ViewListings";
import CreateListings from "./Profile/pages/CreateListings";
import ProductDetails from "./Collections/pages/ProductDetails";

let logoutTimer: number | undefined;

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(
    null
  );
  const login = useCallback(
    (uid: string, username: string, token: string, expirationDate: Date) => {
      setToken(token);
      setUserId(uid);
      setUsername(username);

      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          username: username,
          token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    },
    []
  );
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUsername(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData")!);
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.username,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/products/:product_id" element={<ProductDetails />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/create-listing" element={<CreateListings />} />
        <Route path="/view-listings" element={<ViewListings />} />

        <Route
          path="*"
          element={
            <div className="text-center">
              <h3>404 - Page not found!</h3>
            </div>
          }
        />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/products/:product_id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <div className="text-center">
              <h3>404 - Page not found!</h3>
            </div>
          }
        />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        username: username,
        login: login,
        logout: logout,
      }}
    >
      <CartProvider>
        <NavBar />
        <main className="flex justify-center">{routes}</main>
      </CartProvider>
    </AuthContext.Provider>
  );
}
