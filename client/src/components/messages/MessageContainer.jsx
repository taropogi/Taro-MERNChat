import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected";
import { useState } from "react";
// import useListenMessages from "../../hooks/useListenMessages";
import MessageHeader from "./MessageHeader";
import { useChatContext } from "../../contextProviders/ChatContext";
export default function MessageContainer() {
  const { selectedContact } = useChatContext();

  // useListenMessages();

  const [isTyping, setIsTyping] = useState(false);

  return (
    <div className="md:min-w-[550px] md:max-w-[550px] flex flex-col w-full">
      {selectedContact ? (
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
