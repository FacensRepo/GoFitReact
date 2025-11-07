import { createContext, useContext, useState, ReactNode } from "react";

interface TokenContextType {
  token: string | null;
  setToken: (token: string) => void;
  getToken: () => string;
  userName: string | null;
  setUserName: (name: string) => void;
}

interface TokenProviderProps {
  children: ReactNode;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ children }: TokenProviderProps) => {
  const [token, setTokenState] = useState<string>(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken || "";
  });

  const [userName, setUserNameState] = useState<string>(() => {
    const savedName = localStorage.getItem("name");
    return savedName || "";
  });

  const setToken = (newToken: string) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  const setUserName = (name: string) => {
    setUserNameState(name);
    if (name) {
      localStorage.setItem("name", name);
    } else {
      localStorage.removeItem("name");
    }
  };

  const getToken = () => token;

  return (
    <TokenContext.Provider
      value={{ token, setToken, getToken, userName, setUserName }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
