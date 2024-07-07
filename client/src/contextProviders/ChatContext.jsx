import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
const ChatContext = createContext();

const initialState = {
  selectedContact: null,
  selectedContactMessages: [],
  contacts: [],
  isLoading: false,
  error: null,
  newMessages: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "contacts/loaded":
      return { ...state, isLoading: false, contacts: action.payload };
    case "contact/select":
      return { ...state, isLoading: false, selectedContact: action.payload };
    case "messages/loaded":
      return {
        ...state,
        isLoading: false,
        selectedContactMessages: action.payload,
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("action not found");
  }
}
export function ChatProvider({ className, children }) {
  useEffect(() => {
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

    getContacts();
  }, []);

  const [
    { selectedContact, contacts, isLoading, error, selectedContactMessages },
    dispatch,
  ] = useReducer(reducer, initialState);

  function selectContact(contact) {
    dispatch({ type: "contact/select", payload: contact });
  }

  const getMessages = async () => {
    console.log("getting messages");
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`/api/messages/${selectedContact._id}`);
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);
      dispatch({ type: "messages/loaded", payload: data.messages });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.message || "Internal server error.",
      });
      toast.error(error.message);
    }
  };

  const values = {
    selectedContact,
    contacts,
    isLoading,
    error,
    selectContact,
    getMessages,
    selectedContactMessages,
  };

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
