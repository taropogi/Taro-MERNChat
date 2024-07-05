import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../UI/MessageSkeleton";
import { useEffect, useRef } from "react";
import { useSocket } from "../../contextProviders/SocketContext";
import Typing from "./Typing";
export default function Messages({ isTyping }) {
  const { messages, isLoading, receiverId } = useGetMessages();

  const lastMessageRef = useRef();
  const refMsgBox = useRef();
  const { onlineUsers } = useSocket();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 200);
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      refMsgBox.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 200);
  }, [isTyping]);

  const isToChatOnline = onlineUsers.includes(receiverId);
  return (
    <div className="px-4 flex-1 overflow-auto ">
      {!isLoading &&
        messages.length > 0 &&
        messages.map((message, i) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} isOnline={isToChatOnline} />
          </div>
        ))}

      {isTyping && (
        <p ref={refMsgBox}>
          <Typing />
        </p>
      )}
      {isLoading && <MessageSkeleton />}
      {!isLoading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation.</p>
      )}
    </div>
  );
}
