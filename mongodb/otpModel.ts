import mongoose, { Schema } from "mongoose";

const dataSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
    otpExpiry: {
      type: Date,
      required: true,
      //   index: { expires: 0 }
    },
  },
  { timestamps: true }
);

dataSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 0 });

const otpModel = mongoose.model("Otp", dataSchema);

export default otpModel;
