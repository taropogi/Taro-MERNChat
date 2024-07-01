import { useAuth } from "../../contextProviders/AuthContext";
import useConversation from "../../zustand/useConversation";
export default function Message({ message }) {
  const { authUser } = useAuth();
  const isSenderMe = authUser._id === message.senderId;
  const {
    selectedConversation: { profilePic: toChatProfilePic },
  } = useConversation();
  return (
    <div className={`chat chat-${isSenderMe ? "end" : "start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User Avatar"
            src={isSenderMe ? authUser.profilePic : toChatProfilePic}
          />
        </div>
      </div>
      <div className="chat-header">
        You
        <time className="text-xs opacity-50">12:45</time>
      </div>
      <div
        className={`chat-bubble ${isSenderMe ? "bg-blue-500 text-white" : ""}`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50">Delivered</div>
    </div>
  );
}
