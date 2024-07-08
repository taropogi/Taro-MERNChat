import { extractTime } from "./extractTime";
export default function sortContacts(
  array,
  updateConversationId = null,
  order = "descending"
) {
  if (updateConversationId) {
    array = array.map((c) => {
      if (c._id === updateConversationId)
        return {
          ...c,
          chatLastUpdate: new Date(),
          formattedChatLastUpdate: extractTime(new Date()),
        };

      return c;
    });
  }

  return array.sort((a, b) => {
    if (a.chatLastUpdate && b.chatLastUpdate) {
      const dateA = new Date(a.chatLastUpdate);
      const dateB = new Date(b.chatLastUpdate);

      if (order === "ascending") {
        return dateA - dateB;
      } else if (order === "descending") {
        return dateB - dateA;
      } else {
        throw new Error(
          "Invalid order parameter. Use 'ascending' or 'descending'."
        );
      }
    }

    // If only a has chatLastUpdate, it should come before b
    if (a.chatLastUpdate && !b.chatLastUpdate) {
      return -1;
    }

    // If only b has chatLastUpdate, it should come before a
    if (!a.chatLastUpdate && b.chatLastUpdate) {
      return 1;
    }

    // If neither have chatLastUpdate, maintain their current order
    return 0;
  });
}
