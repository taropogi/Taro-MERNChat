import { useState } from "react";
import toast from "react-hot-toast";
export default function useSignup() {
  const API_URI = import.meta.env.VITE_API_URL;
  const initialInputState = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "Male",
  };

  const [inputs, setInputs] = useState(initialInputState);
  const [isLoading, setIsLoading] = useState(false);
  const { firstName, lastName, userName, password, confirmPassword, gender } =
    inputs;
  const signup = async () => {
    const success = handleInputErrors();
    if (!success) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URI}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  function handleInputErrors() {
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

  return {
    inputs,
    signup,
    isLoading,
    setInputs,
  };
}
