import { useAuth } from "../../../contextProviders/AuthContext";
import { useChatContext } from "../../../contextProviders/ChatContext";
import { useSocket } from "../../../contextProviders/SocketContext";

export default function ContactsFilter() {
  const { onlineUsers } = useSocket();
  const { authUser } = useAuth();
  const { contactsFilterOnlineOnly, dispatch, contacts } = useChatContext();
  const contactsCount = contacts.length;
  const onlineUsersCount = onlineUsers.filter(
    (id) => id !== authUser._id
  ).length;

  if (onlineUsersCount === 0) return;
  return (
    <div>
      <label className="inline-flex items-center space-x-3">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          checked={contactsFilterOnlineOnly}
          onChange={(e) =>
            dispatch({
              type: "contacts/filter/online-only",
              payload: e.target.checked,
            })
          }
        />
        <span className="text-green-200 font-bold">
          Online users only ({onlineUsersCount + "/" + contactsCount})
        </span>
      </label>
    </div>
  );
}
