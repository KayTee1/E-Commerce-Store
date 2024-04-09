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

let logoutTimer: number | undefined;

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(
    null
  );
  const login = useCallback(
    (uid: string, token: string, expirationDate: Date) => {
      setToken(token);
      setUserId(uid);

      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
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

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <CartProvider>
        <NavBar />
        <main className="flex justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
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
        </main>
      </CartProvider>
    </AuthContext.Provider>
  );
}
