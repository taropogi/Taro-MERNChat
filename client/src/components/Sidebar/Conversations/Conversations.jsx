import useGetConversations from "../../../hooks/useGetConversations";

import Conversation from "./Conversation";
export default function Conversations() {
  const { conversations, isLoading } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {!isLoading &&
        conversations.map((conversation, index) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            isLast={index === conversations.length - 1}
          />
        ))}
      {isLoading && (
        <span className="loading loading-spinner loading-xs"></span>
      )}
    </div>
  );
}
