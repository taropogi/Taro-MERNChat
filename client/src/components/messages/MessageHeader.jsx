import { useAuth } from "../../contextProviders/AuthContext";
import useConversation from "../../zustand/useConversation";

export default function MessageHeader() {
  const {
    selectedConversation: { profilePic, fullName },
  } = useConversation();
  const { authUser } = useAuth();
  return (
    <div className="flex items-center justify-between bg-slate-300 px-4 py-2 mb-2">
      <div className="flex items-center gap-2">
        <div className="avatar">
          <div className="w-5 h-5 rounded-full">
            <img src={profilePic} alt="user avatar" />
          </div>
        </div>
        <span className="text-gray-900 font-bold">{fullName}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-900 font-bold">{authUser.fullName}</span>
        <div className="avatar">
          <div className="w-5 h-5 rounded-full">
            <img src={authUser.profilePic} alt="user avatar" />
          </div>
        </div>
      </div>
    </div>
  );
}
