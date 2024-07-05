import User from "../models/user.js";
import Conversation from "../models/conversation.js";

function extractTime(isoString) {
  const date = new Date(isoString);
  const today = new Date();

  const isToday = date.toDateString() === today.toDateString();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours.toString().padStart(2, "0");

  const timeString = `${hours}:${minutes} ${ampm}`;
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const dateString = date.toLocaleDateString(undefined, dateOptions);

  return isToday ? timeString : `${dateString} ${timeString}`;
}

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    // console.log("BE", req.user._id);
    const filteredUsers = await User.find({
      _id: {
        $ne: loggedInUserId, //ne = not equal
      },
    }).select("-password");

    // return res.status(200).json(filteredUsers);
    const chatTimeStamps = await Conversation.find({
      participants: {
        $in: [loggedInUserId],
      },
    }).select("updatedAt participants");

    // // console.log(chatWith);
    return res.status(200).json(
      filteredUsers.map((u) => {
        const plainUser = u.toObject({ virtuals: true });
        const chatWith = chatTimeStamps.find((c) =>
          [loggedInUserId, u._id].every((id) => c.participants.includes(id))
        );

        if (chatWith) {
          plainUser.chatLastUpdate = chatWith.updatedAt;
          plainUser.formattedChatLastUpdate = extractTime(chatWith.updatedAt);
          // console.log(plainUser);
          return plainUser;
        }

        return plainUser;
      })
    );
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message || "Internal Server Error",
    });
  }
};
