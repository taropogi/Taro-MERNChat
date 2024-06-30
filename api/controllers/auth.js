import User from "../models/user.js";
import bcrypt from "bcryptjs";
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
      //generate JWTOken
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        userName: newUser.userName,
      });
    } else {
      res.status(400).json({
        error: "Invalid user data",
      });
    }
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const login = (req, res) => {
  res.send("login");
};

export const logout = (req, res) => {
  console.log("logout");
};
