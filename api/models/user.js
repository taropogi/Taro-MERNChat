import mongoose from "mongoose";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    profilePic: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", (next) => {
  this.firstName = capitalizeFirstLetter(this.firstName);
  this.lastName = capitalizeFirstLetter(this.lastName);
  next();
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
userSchema.set("toJSON", { virtuals: true });
const User = mongoose.model("User", userSchema);
export default User;
