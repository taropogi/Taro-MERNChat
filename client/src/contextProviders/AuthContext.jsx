import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("chat-user")) || null,
  isAuthenticated: false,
  isLoading: false,
  error: "",
  isSignedUp: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "signup/success":
      return {
        ...state,
        isLoading: false,
        isSignedUp: true,
        user: action.payload,
        isAuthenticated: true,
      };
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

  const signup = async (inputs) => {
    const success = handleSingnUpInputErrors(inputs);
    if (!success) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      //set user to localstorage
      // console.log("singup user: ", data);
      localStorage.setItem("chat-user", JSON.stringify(data));
      // console.log("test signup");
      dispatch({ type: "signup/success", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      toast.error(error.message);
    }
  };

  function handleSingnUpInputErrors({
    firstName,
    lastName,
    userName,
    password,
    confirmPassword,
    gender,
  }) {
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      toast.error("Please fill in all the fields");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password mismatch");
      return false;
    }

    if (password.length < 5) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  }

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

      // console.log("login user: ", data);
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
        signup,
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
