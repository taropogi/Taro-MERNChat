import useGetConversations from "../../../hooks/useGetConversations";
import Conversation from "./Conversation";
import { getRandomEmoji } from "../../../utils/emojis";
export default function Conversations() {
  const { isLoading, conversations } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, index) => (
        <Conversation
          key={conversation._id}
          emoji={getRandomEmoji()}
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
