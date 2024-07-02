import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms * 1000));
}
export const sendMessage = async (req, res) => {
  try {
    await sleep(1);
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("participants");

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
      conversation = await conversation.save();
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([newMessage.save(), conversation.save()]);

    // socket IO will go here
    const receiverSockId = getReceiverSocketId(receiverId);
    if (receiverSockId) {
      // use to send event to specific client
      io.to(receiverSockId).emit("newMessage", newMessage);
    }

    res.status(201).json({
      newMessage,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message || "Internal Server Error",
    });
  }
};

export const getMessages = async (req, res) => {
  await sleep(1);
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({
        messages: [],
      });
    }
    const { messages } = conversation;

    res.status(200).json({
      messages,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message || "Internal Server Error",
    });
  }
};
