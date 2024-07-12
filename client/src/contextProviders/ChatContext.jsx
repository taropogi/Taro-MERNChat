import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import sortContacts from "../utils/sortContacts";
import { useSocket } from "./SocketContext";
import notificationSound from "../assets/sounds/notification.mp3";
const ChatContext = createContext();

const initialState = {
  selectedContact: null,
  selectedContactMessages: [],
  contacts: [],
  isLoading: false,
  isLoadingMessages: false,
  isLoadingContacts: false,
  error: null,
  newMessages: JSON.parse(localStorage.getItem("new-messages-counter")) || [],
  isSendingMessage: false,
  contactsFilterOnlineOnly: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "contacts/loading":
      return { ...state, isLoadingContacts: true };
    case "contacts/loaded":
      return {
        ...state,
        isLoadingContacts: false,
        contacts: sortContacts(
          action.payload.map((contact) => {
            return {
              ...contact,
              newMessages:
                state.newMessages?.find((m) => {
                  return m.id === contact._id;
                })?.count || 0,
            };
          })
        ),
      };
    case "contacts/filter/online-only":
      return { ...state, contactsFilterOnlineOnly: action.payload };
    case "contact/select":
      return {
        ...state,
        isLoading: false,
        selectedContact: action.payload,
        contacts: sortContacts([
          ...state.contacts.filter((c) => c._id !== action.payload._id),
          { ...action.payload, newMessages: 0 },
        ]),
      };
    case "messages/loading":
      return { ...state, isLoadingMessages: true };
    case "messages/loaded":
      return {
        ...state,
        isLoadingMessages: false,
        selectedContactMessages: action.payload,
      };
    case "message/sending":
      return { ...state, isSendingMessage: true };
    case "message/sent":
      return {
        ...state,
        isLoading: false,
        isSendingMessage: false,
        selectedContactMessages: [
          ...state.selectedContactMessages,
          action.payload,
        ],
        contacts: sortContacts(state.contacts, state.selectedContact._id),
      };
    case "message/arrived":
      return {
        ...state,
        selectedContactMessages:
          state.selectedContact?._id === action.payload.senderId
            ? [...state.selectedContactMessages, action.payload]
            : state.selectedContactMessages,
        // contacts: sortContacts(state.contacts, action.payload.senderId),
        contacts: sortContacts(
          state.contacts.map((contact) => {
            return contact._id === action.payload.senderId &&
              contact._id !== state.selectedContact?._id
              ? { ...contact, newMessages: contact.newMessages + 1 }
              : contact;
          }),
          action.payload.senderId
        ),
      };
    case "contacts/search/found":
      return { ...state, selectedContact: action.payload, searchContact: "" };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("action not found");
  }
}
export function ChatProvider({ className, children }) {
  const { socket } = useSocket();
  const [
    {
      selectedContact,
      contacts,
      isLoading,
      error,
      selectedContactMessages,
      isSendingMessage,
      isLoadingMessages,
      isLoadingContacts,
      newMessages,
      contactsFilterOnlineOnly,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const searchContacts = function (search) {
    if (!search) return;

    if (search.length < 3) {
      return toast.error("Search term atleast 3 characters long.");
    }
    const contact = contacts.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (contact) {
      dispatch({ type: "contacts/search/found", payload: contact });
    } else {
      toast.error("No such user found");
    }
  };

  const getContacts = async () => {
    dispatch({ type: "contacts/loading" });
    try {
      const res = await fetch("/api/users");
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      dispatch({ type: "contacts/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.message || "Internal server error.",
      });
    }
  };

  const getMessages = async () => {
    dispatch({ type: "messages/loading" });
    try {
      const res = await fetch(`/api/messages/${selectedContact._id}`);
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // console.log(data);
      dispatch({ type: "messages/loaded", payload: data.messages });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.message || "Internal server error.",
      });
      toast.error(error.message);
    }
  };

  const sendMessage = async (message) => {
    if (!message) return;
    dispatch({ type: "message/sending" });
    try {
      const res = await fetch(`/api/messages/send/${selectedContact._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // data.newMessage.shouldShake = true;
      dispatch({ type: "message/sent", payload: data.newMessage });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.message || "Internal server error.",
      });
      toast.error(error.message);
    }
  };
  function updateContactNewMessages(id, count = null) {
    const storageNewMessages = JSON.parse(
      localStorage.getItem("new-messages-counter")
    );

    let rec = storageNewMessages.find((m) => m.id === id)?.count || 0;

    // console.log(storageNewMessages);
    localStorage.setItem(
      "new-messages-counter",
      JSON.stringify([
        ...storageNewMessages.filter((m) => {
          return m.id !== id;
        }),
        {
          id,
          count: count ?? rec + (selectedContact?._id === id ? 0 : 1),
        },
      ])
    );
  }
  function selectContact(contact) {
    updateContactNewMessages(contact._id, 0);

    dispatch({ type: "contact/select", payload: contact });
  }

  useEffect(() => {
    getContacts();

    const newMessagesStore = JSON.parse(
      localStorage.getItem("new-messages-counter")
    );

    if (!newMessagesStore) {
      localStorage.setItem("new-messages-counter", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (selectedContact) getMessages();
  }, [selectedContact]);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      // console.log(newMessage);
      if (selectedContact?._id === newMessage.senderId) {
        newMessage.shouldShake = true;
      } else {
        toast(newMessage.message, {
          icon: `✉`,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }

      updateContactNewMessages(newMessage.senderId);

      dispatch({ type: "message/arrived", payload: newMessage });

      const sound = new Audio(notificationSound);
      sound.play();

      // console.log(contacts);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, selectedContact]);

  const values = {
    selectedContact,
    contacts,
    isLoading,
    error,
    selectContact,
    getMessages,
    selectedContactMessages,
    isSendingMessage,
    isLoadingMessages,
    isLoadingContacts,
    sendMessage,
    searchContacts,
    dispatch,
    contactsFilterOnlineOnly,
  };
  // console.log(socket);
  return (
    <ChatContext.Provider value={values}>
      <div className={className}>{children} </div>
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined)
    throw new Error("ChatProvider was used outside the scope.");
  return context;
}
