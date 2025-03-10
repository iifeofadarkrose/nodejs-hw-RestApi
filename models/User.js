import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
  username: {
      type: String,
  },
  email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, 'Email is required'],
  },
  password: {
      type: String,
      minlength: 6,
      required: [true, 'Password is required'],
  },
  token: {
      type: String,
      default: null,
  },
  owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
  },
  verify: {
      type: Boolean,
      default: false,
    },
  verificationCode: {
      type: String,
    },
  avatarURL: String,
}, { versionKey: false, timestamps: true })


userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

export const userSignupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const User = model("user", userSchema);

export default User;
