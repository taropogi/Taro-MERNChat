import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
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

    // socket IO will go here

    await Promise.all([newMessage.save(), conversation.save()]);

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
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      res.status(200).json({
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
