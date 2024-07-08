import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("chat-user")) || null,
  isAuthenticated: false,
  isLoading: false,
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "loggedIn":
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isAuthenticated: true,
      };
    case "loggedOut":
      return { ...state, user: null, isLoading: false, isAuthenticated: false };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("action not found.");
  }
}
export function AuthProvider({ children }) {
  const [{ user: authUser, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = async (userName, password) => {
    try {
      if (!userName || !password) {
        toast.error("Username and Password are required.");
        return;
      }
      dispatch({ type: "loading" });

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      dispatch({ type: "loggedIn", payload: data });

      toast.success("You are now logged in 😉");
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      toast.error(error.message || "Invalid Username or Password");
    }
  };

  const logout = async () => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("chat-user");
      dispatch({ type: "loggedOut" });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      toast.error(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        login,
        isLoading,
        error,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the scope.");

  return context;
}
