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
    <div className="md:min-w-[450px] flex flex-col w-full">
      {selectedConversation ? (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To: </span>
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}
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
