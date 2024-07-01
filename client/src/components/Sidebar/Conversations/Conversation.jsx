import useConversation from "../../../zustand/useConversation";
export default function Conversation({ conversation, emoji, isLast = false }) {
  const { profilePic, firstName, lastName } = conversation;
  const fullName = `${firstName} ${lastName}`;

  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  return (
    <>
      <div
        onClick={() => setSelectedConversation(conversation)}
        className={`${
          isSelected ? "bg-sky-500" : ""
        } flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!isLast && <div className="divider my-0 py-0 h-1" />}
    </>
  );
}
