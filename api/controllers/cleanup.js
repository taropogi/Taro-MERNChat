import Message from "../models/message.js";
import Conversation from "../models/conversation.js";
export const reset = async function (req, res) {
  try {
    const userId = req.user._id;
    if (userId.toString() !== "66843d090b4a38eeefd87384")
      throw new Error("Not authenticated");

    const hoursPast = 24;
    const hoursAgo = new Date(Date.now() - hoursPast * 60 * 60 * 1000);
    await Message.deleteMany({ createdAt: { $lt: hoursAgo } }); // $lt means less than
    console.log("Reset messages done");

    // Step 1: Retrieve all existing message IDs
    const existingMessages = await Message.find({}, "_id");
    const existingMessageIds = existingMessages.map((msg) =>
      msg._id.toString()
    );

    // Step 2: Retrieve all conversations and update them
    const conversations = await Conversation.find();

    for (const conversation of conversations) {
      // Filter out message IDs that no longer exist
      const updatedMessages = conversation.messages.filter((messageId) =>
        existingMessageIds.includes(messageId.toString())
      );

      // If there are changes, update the conversation
      if (updatedMessages.length !== conversation.messages.length) {
        conversation.messages = updatedMessages;
        await conversation.save();
      }
    }

    console.log("updated conversation messages");

    res.status(201).json({
      message: "reset done",
    });
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode || 500).json({
      error: error.message || "Internal Server Error",
    });
  }
};
