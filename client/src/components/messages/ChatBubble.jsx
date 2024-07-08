const ChatBubble = ({ data }) => {
  const {
    isSenderMe,
    avatar,
    message: { message },
    formattedTime,
    shakeClass,
    isOnline,
  } = data;
  return (
    <>
      <div
        className={` ${shakeClass} chat chat-${isSenderMe ? "end" : "start"}`}
      >
        <div className={`chat-image avatar ${isOnline ? "online" : ""}`}>
          <div className="w-10 rounded-full">
            <img alt="Avatar" src={avatar} />
          </div>
        </div>
        {/* <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50">{formattedTime}</time>
        </div> */}
        <div
          className={`chat-bubble chat-bubble-${
            isSenderMe ? "info" : "secondary"
          }`}
        >
          {message}
        </div>
        <div className="chat-footer opacity-50">{formattedTime}</div>
      </div>

      {/* <div
        className={`flex items-start ${isSenderMe ? "justify-end" : ""} mb-4`}
      >
        {!isSenderMe && (
          <div className="relative">
            <img
              src={avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full mr-4 mb-0"
            />
            {isOnline && (
              <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
            )}
          </div>
        )}

        <div
          className={`${shakeClass} flex-1 max-w-[70%] rounded overflow-hidden shadow-lg ${
            isSenderMe ? "bg-red-400 text-white" : "bg-white"
          }  p-4`}
        >
          <p
            className={` ${
              isSenderMe ? "text-white" : "text-gray-700"
            } text-base`}
          >
            {message}
          </p>
          <span
            className={`text-xs text-gray-${
              isSenderMe ? "300" : "500"
            } float-right`}
          >
            {formattedTime}
          </span>
        </div>

        {isSenderMe && (
          <img
            src={avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full ml-4"
          />
        )}
      </div> */}
    </>
  );
};

export default ChatBubble;
