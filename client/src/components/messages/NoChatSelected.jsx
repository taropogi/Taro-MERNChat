import { RiMessage2Line } from "react-icons/ri";
import { useAuth } from "../../contextProviders/AuthContext";
export default function NoChatSelected() {
  const {
    authUser: { fullName },
  } = useAuth();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👍 {fullName}</p>
        <p>Select a Chat to start messaging</p>
        <RiMessage2Line className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
}
