import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Types = Schema.Types;
const messageSchema = new Schema(
  {
    senderId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
