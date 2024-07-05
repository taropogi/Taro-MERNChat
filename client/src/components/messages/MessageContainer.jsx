import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected";
import useConversation from "../../zustand/useConversation";
import { useEffect, useState } from "react";
import useListenMessages from "../../hooks/useListenMessages";
export default function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useListenMessages();

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    return function () {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[550px] md:max-w-[550px] flex flex-col w-full">
      {selectedConversation ? (
        <>
          <div className="flex item-center gap-2 bg-slate-300 px-4 py-2 mb-2">
            <div className={`avatar`}>
              <div className="w-5 h-5 rounded-full">
                <img src={selectedConversation.profilePic} alt="user avatar" />
              </div>
            </div>
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}{" "}
            </span>
          </div>
          <Messages isTyping={isTyping} />
          <MessageInput onIsTyping={setIsTyping} />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
}
