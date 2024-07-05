import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import sortConversations from "../utils/sortConversations";
import { extractTime } from "../utils/extractTime";
export default function useSendMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    messages,
    setMessages,
    selectedConversation: { _id: receiverId },
    conversations,
    setConversations,
  } = useConversation();

  const handleSendMessage = async () => {
    if (!message) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/messages/send/${receiverId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessage("");
      setMessages([...messages, data.newMessage]);
      setConversations(sortConversations(conversations, receiverId));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    message,
    setMessage,
    handleSendMessage,
  };
}
