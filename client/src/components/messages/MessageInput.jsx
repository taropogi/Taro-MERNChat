import { IoSend } from "react-icons/io5";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "../../contextProviders/SocketContext";
import _ from "lodash";
import { useAuth } from "../../contextProviders/AuthContext";
import { useChatContext } from "../../contextProviders/ChatContext";

export default function MessageInput({ onIsTyping: setIsTyping }) {
  const refMessageInput = useRef(null);
  const {
    selectedContact: { _id: receiverId, fullName: toFullName },
    isLoading: isSending,
    sendMessage,
  } = useChatContext();
  const { authUser } = useAuth();
  const { socket } = useSocket();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(message);
    setMessage("");
  };

  //typing
  useEffect(() => {
    const handleTyping = (res) => {
      if (res.senderId === receiverId) {
        console.log(res.senderId + " is typingxx");

        setIsTyping(true);
      }
      setTimeout(() => setIsTyping(false), 3000); // hide typing if 3 second of inactivity
    };
    socket.on("typing", handleTyping);
    return () => {
      socket.off("typing", handleTyping);
    };
  }, [receiverId]);

  useEffect(() => {
    refMessageInput?.current.focus();
  }, [isSending]);

  // Use useCallback to debounce the typing event
  const emitTypingEvent = useCallback(
    _.debounce(() => {
      socket.emit("typing", { receiverId, senderId: authUser._id });
    }, 500),
    [receiverId]
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
