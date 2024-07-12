import { useEffect, useState } from "react";
import { useChatContext } from "../../../contextProviders/ChatContext";
import { useSocket } from "../../../contextProviders/SocketContext";
import Contact from "./Contact";

export default function Contacts() {
  const {
    contacts,
    isLoadingContacts: isLoading,
    contactsFilterOnlineOnly,
  } = useChatContext();
  const { onlineUsers } = useSocket();

  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    // console.log("set");
    if (contactsFilterOnlineOnly) {
      setFilteredContacts(
        contacts.filter((contact) => onlineUsers.includes(contact._id))
      );
    } else {
      setFilteredContacts(contacts);
    }
  }, [contactsFilterOnlineOnly, onlineUsers, contacts, setFilteredContacts]);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {filteredContacts.length > 0 &&
        filteredContacts.map((contact, index) => (
          <Contact
            key={contact._id}
            contact={contact}
            isLast={index === contact.length - 1}
          />
        ))}
      {isLoading && (
        <span className="loading loading-spinner loading-xs"></span>
      )}
    </div>
  );
}
