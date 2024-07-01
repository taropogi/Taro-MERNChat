import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../UI/MessageSkeleton";
export default function Messages() {
  const { messages, isLoading } = useGetMessages();

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!isLoading &&
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
      {isLoading && <MessageSkeleton />}
      {!isLoading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation.</p>
      )}
    </div>
  );
}
