import useConversation from "../../../zustand/useConversation";
import { useSocket } from "../../../contextProviders/SocketContext";
export default function Conversation({ conversation, isLast = false }) {
  const {
    selectedConversation,
    setSelectedConversation,
    newMessages,
    setNewMessages,
  } = useConversation();
  const conNewMessages = newMessages.find((m) => m.fromId === conversation._id);

  const { profilePic, firstName, lastName } = conversation;
  const fullName = `${firstName} ${lastName}`;

  const isSelected = selectedConversation?._id === conversation._id;

  const { onlineUsers } = useSocket();
  const isOnline = onlineUsers.includes(conversation._id);

  function handleSelectConversation() {
    setSelectedConversation(conversation);
    setNewMessages(
      [...newMessages].filter((m) => m.fromId !== conversation._id)
    );
  }

  return (
    <>
      <div
        onClick={handleSelectConversation}
        className={`${
          isSelected ? "bg-red-400" : ""
        } flex gap-2 items-center hover:bg-red-400 rounded p-2 py-1 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{fullName}</p>

            {conNewMessages ? (
              <span className="badge badge-secondary text-white">
                {conNewMessages.count}
              </span>
            ) : (
              conversation.formattedChatLastUpdate
            )}
          </div>
        </div>
      </div>

      {!isLast && <div className="divider my-0 py-0 h-1" />}
    </>
  );
}
