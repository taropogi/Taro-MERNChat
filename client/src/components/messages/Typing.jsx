import useConversation from "../../zustand/useConversation";

export default function Typing() {
  const {
    selectedConversation: { firstName },
  } = useConversation();
  return (
    <>
      <span> {firstName} is typing .</span>{" "}
      <span className="loading loading-ball loading-xs"></span>
      <span className="loading loading-ball loading-sm"></span>
    </>
  );
}
