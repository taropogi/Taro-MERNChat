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
  error: null,
  newMessages: [],
  isSendingMessage: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "contacts/loaded":
      return {
        ...state,
        isLoading: false,
        contacts: sortContacts(
          action.payload.map((contact) => ({ ...contact, newMessages: 0 }))
        ),
      };
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
    case "messages/loaded":
      return {
        ...state,
        isLoading: false,
        selectedContactMessages: action.payload,
      };
    case "message/sent":
      return {
        ...state,
        isLoading: false,
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
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const getContacts = async () => {
    dispatch({ type: "loading" });
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
    dispatch({ type: "loading" });
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
    dispatch({ type: "loading" });
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
      dispatch({ type: "message/sent", payload: data.newMessage });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.message || "Internal server error.",
      });
      toast.error(error.message);
    }
  };

  function selectContact(contact) {
    dispatch({ type: "contact/select", payload: contact });
  }

  useEffect(() => {
    getContacts();
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

      dispatch({ type: "message/arrived", payload: newMessage });

      const sound = new Audio(notificationSound);
      sound.play();

      // console.log(contacts);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket]);

  const values = {
    selectedContact,
    contacts,
    isLoading,
    error,
    selectContact,
    getMessages,
    selectedContactMessages,
    isSendingMessage,
    sendMessage,
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
