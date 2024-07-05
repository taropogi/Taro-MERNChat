const ChatBubble = ({ data }) => {
  const {
    isSenderMe,
    avatar,
    message: { message },
    formattedTime,
    shakeClass,
  } = data;
  return (
    <>
      <div
        className={`flex items-start ${isSenderMe ? "justify-end" : ""} mb-4`}
      >
        {!isSenderMe && (
          <img
            src={avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full mr-4 mb-0"
          />
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
      </div>
    </>
  );
};

export default ChatBubble;
