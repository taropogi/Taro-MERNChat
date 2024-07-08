import { useAuth } from "../../contextProviders/AuthContext";
import { extractTime } from "../../utils/extractTime";
import ChatBubble from "./ChatBubble";
import { useChatContext } from "../../contextProviders/ChatContext";
export default function Message({ isOnline, message }) {
  const { authUser } = useAuth();

  const isSenderMe = authUser._id === message.senderId;
  const {
    selectedContact: {
      profilePic: toChatProfilePic,
      firstName: toChatFirstName,
    },
  } = useChatContext();
  const formattedTime = extractTime(message.createdAt);
  const shakeClass = message?.shouldShake ? "shake" : "";

  const data = {
    isOnline,
    isSenderMe,
    toChatFirstName,
    formattedTime,
    shakeClass,
    message,
    avatar: isSenderMe ? authUser.profilePic : toChatProfilePic,
  };

  return <ChatBubble data={data} />;
}
