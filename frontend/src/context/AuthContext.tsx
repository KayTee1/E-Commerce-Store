import { createContext } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
  login: (userId: string, token: string, expirationDate: Date) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
});
