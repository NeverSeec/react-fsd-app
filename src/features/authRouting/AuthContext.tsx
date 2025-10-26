import React, {
  createContext,
  useState,
  useContext,
  useLayoutEffect,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface UserResponse {
  user: {
    id: string;
    email: string;
  };
  accessToken: string;
}

type User = UserResponse | null;

export interface AuthContextType {
  user: User;
  login: (email: string, password: string) => Promise<UserResponse>;
  logout: VoidFunction;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshTokens = async () => {
    try {
      const { data } = await axios.get<UserResponse>(
        "https://api.v2.react-learning.ru/auth/refresh-tokens",
      );
      setUser(data);
      localStorage.setItem("accessToken", data.accessToken);

      axios.defaults.headers.common["Authorization"] = data.accessToken;

      return true;
    } catch (error) {
      console.error("Токена  нет:", error);

      // Добавил, тк ресты плохо работают
      // void logout();
      const data = localStorage.getItem("accessToken");

      if (!data) return;

      const user: UserResponse = JSON.parse(data);
      setUser(user);

      return false;
    }
  };

  const checkAuth = async () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      await refreshTokens();
    }

    setIsLoading(false);
  };

  useLayoutEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    return await axios
      .post<UserResponse>("https://api.v2.react-learning.ru/auth/login", {
        email: email,
        password: password,
      })
      .then(({ data }) => {
        setUser(data);
        localStorage.setItem("accessToken", JSON.stringify(data));

        axios.defaults.headers.common["Authorization"] = data.accessToken;
        navigate("/profile");
        return data;
      })
      .finally(() => setIsLoading(false));
  };

  const logout = async () => {
    setIsLoading(true);
    localStorage.removeItem("accessToken");
    return await axios
      .get("https://api.v2.react-learning.ru/auth/logout")
      .then(() => {
        navigate("/login");
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
