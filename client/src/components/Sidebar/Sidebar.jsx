// import Conversations from "./Conversations/Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import Contacts from "./Contacts/Contacts";
export default function Sidebar() {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <Contacts />
      {/* <Conversations /> */}
      <LogoutButton />
    </div>
  );
}
