import { useEffect } from "react";
import { useSocket } from "../contextProviders/SocketContext";
import useConversation from "../zustand/useConversation";

export default function useListenMessages() {
  const { socket } = useSocket();

  const {
    selectedConversation,
    messages,
    setMessages,
    newMessages,
    setNewMessages,
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
        setMessages([...messages, newMessage]);
      }

      addNewMessage(newMessage);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages, newMessages, selectedConversation]);
}
