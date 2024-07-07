import { useChatContext } from "../../../contextProviders/ChatContext";
import Contact from "./Contact";

export default function Contacts() {
  const { contacts, isLoading } = useChatContext();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {contacts.length > 0 &&
        contacts.map((contact, index) => (
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
