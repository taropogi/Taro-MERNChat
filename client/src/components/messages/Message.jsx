import { useAuth } from "../../contextProviders/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

export default function Message({ isOnline, message }) {
  const { authUser } = useAuth();

  const isSenderMe = authUser._id === message.senderId;
  const {
    selectedConversation: {
      profilePic: toChatProfilePic,
      firstName: toChatFirstName,
    },
  } = useConversation();
  const formattedTime = extractTime(message.createdAt);

  return (
    <>
      <div className={`chat chat-${isSenderMe ? "end" : "start"}`}>
        <div
          className={`  chat-image avatar ${
            isOnline && !isSenderMe ? "online" : ""
          }`}
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={isSenderMe ? authUser.profilePic : toChatProfilePic}
            />
          </div>
        </div>
        <div className="chat-header">
          <span>{isSenderMe ? "You " : `${toChatFirstName} `} </span>
          <time className="text-xs opacity-50">{formattedTime}</time>
        </div>
        <div
          className={`chat-bubble ${
            isSenderMe ? "bg-blue-500 text-white" : ""
          }`}
        >
          {" "}
          {message.message}
        </div>
      </div>
    </>
  );
}
