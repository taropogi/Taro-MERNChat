import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../UI/MessageSkeleton";
import { useEffect, useRef } from "react";
export default function Messages() {
  const { messages, isLoading } = useGetMessages();
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 200);
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!isLoading &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {isLoading && <MessageSkeleton />}
      {!isLoading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation.</p>
      )}
    </div>
  );
}
