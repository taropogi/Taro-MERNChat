import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Types = Schema.Types;

const conversationSchema = Schema(
  {
    participant: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
