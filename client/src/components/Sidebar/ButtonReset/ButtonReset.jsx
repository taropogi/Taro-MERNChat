import { useState } from "react";
import toast from "react-hot-toast";
import { GrPowerReset } from "react-icons/gr";

export default function ButtonReset() {
  const [isLoading, setIsLoading] = useState(false);
  async function handleReset() {
    try {
      setIsLoading(true);
      await fetch(`/api/app/reset/cleanup`);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <button
      className="btn btn-circle bg-red-800 text-white"
      onClick={handleReset}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <GrPowerReset className="w-6 h-6 outline-none" />
      )}
    </button>
  );
}
