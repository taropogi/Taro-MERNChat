import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contextProviders/AuthContext";
const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthUser } = useAuth();
  const login = async (e) => {
    e.preventDefault();
    try {
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
      setAuthUser(data);
    } catch (error) {
      toast.error("Invalid Username or Password");
    }
  };

  return {
    isLoading,
    login,
    userName,
    setUserName,
    password,
    setPassword,
  };
};
export default useLogin;
