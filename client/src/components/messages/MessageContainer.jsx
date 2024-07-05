import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected";
import useConversation from "../../zustand/useConversation";
import { useEffect, useState } from "react";
import useListenMessages from "../../hooks/useListenMessages";
import MessageHeader from "./MessageHeader";
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
          <MessageHeader />
          <Messages isTyping={isTyping} />
          <MessageInput onIsTyping={setIsTyping} />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
}
