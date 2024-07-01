import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
export default function useGetMessages() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    messages,
    setMessages,
    selectedConversation: { _id: receiverId },
  } = useConversation();
  useEffect(() => {
    const getMessages = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/messages/${receiverId}`);

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setMessages(data.messages);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    receiverId && getMessages();
  }, [receiverId]);
  return {
    isLoading,
    messages,
    receiverId,
  };
}
