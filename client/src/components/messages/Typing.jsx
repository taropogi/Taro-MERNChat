import { useChatContext } from "../../contextProviders/ChatContext";

export default function Typing() {
  const {
    selectedContact: { firstName },
  } = useChatContext();
  return (
    <>
      <span> {firstName} is typing .</span>{" "}
      <span className="loading loading-ball loading-xs"></span>
      <span className="loading loading-ball loading-sm"></span>
    </>
  );
}
