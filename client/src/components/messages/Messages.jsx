import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
export default function Messages() {
  const { messages } = useGetMessages();

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </div>
  );
}
