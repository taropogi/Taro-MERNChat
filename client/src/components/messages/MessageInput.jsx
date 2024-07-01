import { IoSend } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";
import { useEffect, useRef } from "react";

export default function MessageInput() {
  const refMessageInput = useRef(null);
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

  useEffect(() => {
    refMessageInput?.current.focus();
  }, [isSending]);

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          ref={refMessageInput}
          disabled={isSending}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
