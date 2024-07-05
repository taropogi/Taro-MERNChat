import { useEffect } from "react";
import { useSocket } from "../contextProviders/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";
import toast from "react-hot-toast";
import sortConversations from "../utils/sortConversations";
import { extractTime } from "../utils/extractTime";
export default function useListenMessages() {
  const { socket } = useSocket();

  const {
    selectedConversation,
    messages,
    setMessages,
    newMessages,
    setNewMessages,
    conversations,
    setConversations,
  } = useConversation();

  useEffect(() => {
    const addNewMessage = (newMessage) => {
      if (selectedConversation?._id === newMessage.senderId) {
        return;
      }
      const theMessageCounter = newMessages.find(
        (m) => m.fromId === newMessage.senderId
      );

      if (theMessageCounter === undefined) {
        setNewMessages([
          ...newMessages,
          { fromId: newMessage.senderId, count: 1 },
        ]);
      } else {
        const filteredNewMessages = [...newMessages].filter(
          (m) => m.fromId !== newMessage.senderId
        );
        setNewMessages([
          ...filteredNewMessages,
          { ...theMessageCounter, count: theMessageCounter.count + 1 },
        ]);
      }
    };

    socket?.on("newMessage", (newMessage) => {
      if (selectedConversation?._id === newMessage.senderId) {
        newMessage.shouldShake = true;

        setMessages([...messages, newMessage]);
      } else {
        toast(newMessage.message, {
          icon: `✉`,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }

      addNewMessage(newMessage);
      const sound = new Audio(notificationSound);
      sound.play();

      setConversations(sortConversations(conversations, newMessage.senderId));
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [
    socket,
    messages,
    setMessages,
    newMessages,
    selectedConversation,
    setNewMessages,
    conversations,
    setConversations,
  ]);
}
