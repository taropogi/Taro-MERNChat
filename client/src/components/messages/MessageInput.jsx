import { IoSend } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";
import { useCallback, useEffect, useRef } from "react";
import { useSocket } from "../../contextProviders/SocketContext";
import _ from "lodash";
import useConversation from "../../zustand/useConversation";

export default function MessageInput({ onIsTyping: setIsTyping }) {
  const refMessageInput = useRef(null);
  const {
    selectedConversation: { _id: receiverId },
  } = useConversation();
  const { socket } = useSocket();
  const {
    isLoading: isSending,
    message,
    setMessage,
    handleSendMessage,
  } = useSendMessage();

  const handleSubmit = (e) => {
    e.preventDefault();

    handleSendMessage();
  };

  //typing
  useEffect(() => {
    const handleTyping = () => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 3000); // hide typing if 1 second of inactivity
    };
    socket.on("typing", handleTyping);
    return () => {
      socket.off("typing", handleTyping);
    };
  }, []);

  useEffect(() => {
    refMessageInput?.current.focus();
  }, [isSending]);

  // Use useCallback to debounce the typing event
  const emitTypingEvent = useCallback(
    _.debounce(() => {
      socket.emit("typing", { receiverId });
    }, 500),
    []
  ); // Adjust debounce delay as needed

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    emitTypingEvent();
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          ref={refMessageInput}
          disabled={isSending}
          value={message}
          onChange={handleInputChange}
          type="text"
          className="border text-sm rounded-lg block w-full  p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
        />
        <button
          disabled={isSending}
          className="absolute inset-y-0 end-0 flex items-center pe-3"
          type="submit"
        >
          {isSending ? (
            <>
              <span className="text-sm">Sending...</span>{" "}
              <span className="loading loading-spinner loading-xs"></span>
            </>
          ) : (
            <IoSend />
          )}
        </button>
      </div>
    </form>
  );
}
