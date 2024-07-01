import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms * 1000));
}
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, userName, password, confirmPassword, gender } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "Passwords don't match",
      });
    }

    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({
        error: "Username already exists",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10); // 10 rounds
    const hashedPw = await bcrypt.hash(password, salt);

    // avatar img: https://avatar.iran.liara.run/public/boy
    const profilePic = `https://avatar.iran.liara.run/public/${
      gender === "male" ? "boy" : "girl"
    }?username=${userName}`;

    const newUser = new User({
      firstName,
      lastName,
      userName,
      password: hashedPw,
      gender,
      profilePic,
    });

    if (newUser) {
      await newUser.save();

      //generate JWTOken
      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        firstName,
        lastName,
        userName,
        profilePic,
      });
    } else {
      res.status(400).json({
        error: "Invalid user data",
      });
    }
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    await sleep(1); //
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect)
      return res.status(400).json({
        error: "Invalid username or password",
      });

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic,
      fullName: user.fullName,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  await sleep(1); //

  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
