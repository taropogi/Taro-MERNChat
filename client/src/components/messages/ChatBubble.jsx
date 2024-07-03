export function ChatBubbleLeft({ data }) {
  const {
    message: { message },
    avatar,
  } = data;

  return (
    <div className="flex items-start mb-4">
      <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
      <div className="flex-1 max-w-[60%] rounded overflow-hidden shadow-lg bg-white p-4">
        <p className="text-gray-700 text-base">{message}</p>
        <span className="text-xs text-gray-500 float-right">12:34 PM</span>
      </div>
    </div>
  );
}

export function ChatBubbleRight({ data }) {
  const {
    message: { message },
    avatar,
  } = data;
  return (
    <div className="flex items-start justify-end mb-4">
      <div className="flex-1 max-w-[60%] rounded overflow-hidden shadow-lg bg-red-400 text-white p-4">
        <p className="text-white text-base">{message}</p>
        <span className="text-xs text-gray-300 float-right">12:35 PM</span>
      </div>
      <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full ml-4" />
    </div>
  );
}

const ChatBubble = ({ data }) => {
  const {
    isSenderMe,
    avatar,
    message: { message },
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
            className="w-10 h-10 rounded-full mr-4"
          />
        )}

        <div
          className={`flex-1 max-w-[60%] rounded overflow-hidden shadow-lg ${
            isSenderMe ? "bg-red-400 text-white" : "bg-white"
          }  p-4`}
        >
          <p
            className={`${
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
            12:35 PM
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
      {/* <div className="flex items-start mb-4">
      <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
      <div className="flex-1 max-w-[60%] rounded overflow-hidden shadow-lg bg-white p-4">
        <p className="text-gray-700 text-base">{message}</p>
        <span className="text-xs text-gray-500 float-right">12:34 PM</span>
      </div>
    </div>

    <div className="flex items-start justify-end mb-4">
      <div className="flex-1 max-w-[60%] rounded overflow-hidden shadow-lg bg-red-400 text-white p-4">
        <p className="text-white text-base">{message}</p>
        <span className="text-xs text-gray-300 float-right">12:35 PM</span>
      </div>
      <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full ml-4" />
    </div> */}
    </>
  );
};

export default ChatBubble;
