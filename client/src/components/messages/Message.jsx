import { useAuth } from "../../contextProviders/AuthContext";
export default function Message({ message }) {
  const { authUser } = useAuth();
  const isSender = authUser._id === message.senderId;
  return (
    <div className={`chat chat-${isSender ? "end" : "start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="User Avatar" src={authUser.profilePic} />
        </div>
      </div>
      <div className="chat-header">
        You
        <time className="text-xs opacity-50">12:45</time>
      </div>
      <div className="chat-bubble">{message.message}</div>
      <div className="chat-footer opacity-50">Delivered</div>
    </div>
  );
}
