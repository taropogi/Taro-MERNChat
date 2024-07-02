import User from "../models/user.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    // console.log("BE", req.user._id);
    const filteredUsers = await User.find({
      _id: {
        $ne: loggedInUserId, //ne = not equal
      },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message || "Internal Server Error",
    });
  }
};
