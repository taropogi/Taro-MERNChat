import { useSocket } from "../../../contextProviders/SocketContext";
import { useChatContext } from "../../../contextProviders/ChatContext";
export default function Contact({ contact, isLast = false }) {
  const {
    selectedContact,
    selectContact,
    //   newMessages,
    //   setNewMessages,
  } = useChatContext();
  const conNewMessages = contact.newMessages;
  // console.log(conNewMessages);

  const { profilePic, firstName, lastName } = contact;
  const fullName = `${firstName} ${lastName}`;
  let fullNameCut;

  const fullNameLimit = 15;
  if (fullName.length <= fullNameLimit) {
    fullNameCut = fullName; // Display full name if 10 characters or less
  } else {
    fullNameCut = `${fullName.slice(0, fullNameLimit)}...`; // Truncate and add '...' if more than 10 characters
  }
  const isSelected = selectedContact?._id === contact._id;

  const { onlineUsers } = useSocket();
  const isOnline = onlineUsers.includes(contact._id);

  function handleSelectedChat() {
    selectContact(contact);
    //   setNewMessages(
    //     [...newMessages].filter((m) => m.fromId !== conversation._id)
    //   );
  }

  return (
    <>
      <div
        onClick={handleSelectedChat}
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
            <p className="font-bold text-gray-200">{fullNameCut}</p>

            {conNewMessages > 0 ? (
              <span className="badge badge-secondary text-white">
                {conNewMessages}
              </span>
            ) : (
              contact.formattedChatLastUpdate
            )}
          </div>
        </div>
      </div>

      {!isLast && <div className="divider my-0 py-0 h-1" />}
    </>
  );
}
