import { useState } from "react";
import { useAuth } from "../contextProviders/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuth();

  const logout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, logout };
};

export default useLogout;
