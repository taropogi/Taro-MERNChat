import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import { useChatContext } from "../../contextProviders/ChatContext";
import ButtonReset from "./ButtonReset/ButtonReset";
import { useAuth } from "../../contextProviders/AuthContext";

export default function SearchInput() {
  const [search, setSearch] = useState("");

  const { searchContacts } = useChatContext();

  const {
    authUser: { _id: userId },
  } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    searchContacts(search);
  };
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="input input-bordered rounded-full"
        placeholder="Search.."
      />
      <button type="submit" className="btn btn-circle bg-red-400 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
      {userId === "66843d090b4a38eeefd87384" && <ButtonReset />}
    </form>
  );
}
