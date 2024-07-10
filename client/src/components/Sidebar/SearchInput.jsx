import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import { useChatContext } from "../../contextProviders/ChatContext";

export default function SearchInput() {
  const [search, setSearch] = useState("");

  const { searchContacts } = useChatContext();

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
    </form>
  );
}
