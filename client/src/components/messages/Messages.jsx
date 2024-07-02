import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../UI/MessageSkeleton";
import { useEffect, useRef } from "react";
import { useSocket } from "../../contextProviders/SocketContext";
export default function Messages() {
  const { messages, isLoading, receiverId } = useGetMessages();

  const lastMessageRef = useRef();
  const { onlineUsers } = useSocket();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 200);
  }, [messages]);
  const isToChatOnline = onlineUsers.includes(receiverId);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!isLoading &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} isOnline={isToChatOnline} />
          </div>
        ))}
      {isLoading && <MessageSkeleton />}
      {!isLoading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation.</p>
      )}
    </div>
  );
}
