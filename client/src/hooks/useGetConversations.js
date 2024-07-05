import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import sortConversations from "../utils/sortConversations";

const useGetConversations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { conversations, setConversations } = useConversation();

  useEffect(() => {
    const getConversations = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/users");

        const data = await res.json();
        // console.log(data);
        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(sortConversations(data));
      } catch (error) {
        toast.error(error.message || "Internal server error.");
      } finally {
        setIsLoading(false);
      }
    };

    getConversations();
  }, []);

  return { isLoading, conversations };
};

export default useGetConversations;
