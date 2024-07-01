import { useAuth } from "../../contextProviders/AuthContext";
export default function Message({ message }) {
  const { authUser } = useAuth();
  const isSender = authUser._id === message.senderId;
  return (
    <>
      {/* <div className={`chat chat-${isSender ? "start" : "end"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://avatar.iran.liara.run/public/boy?username=taropogi"
            />
          </div>
        </div>
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble text-white bg-blue-500">
          {message.message}
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          Delivered
        </div>
      </div> */}
      <div className={`chat chat-${isSender ? "start" : "end"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="User Avatar"
              src="https://avatar.iran.liara.run/public/boy?username=taropogi"
            />
          </div>
        </div>
        <div className="chat-header">
          You
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">{message.message}</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
    </>
  );
}
