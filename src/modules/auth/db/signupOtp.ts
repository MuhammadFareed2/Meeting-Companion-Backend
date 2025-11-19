import otpModel from "../../../../mongodb/otpModel.ts";
import userModel from "../../../../mongodb/userModel.ts";

const signupOtpDB = async (data: any) => {
  try {
    const emailExists = await userModel.exists({ email: data.email });
    const { email, otp, otpExpiry } = data;
    if (emailExists == null) {
      const otpRes = await otpModel.findOneAndUpdate(
        { email },
        { otp, otpExpiry },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );
      // console.log(emailExists);
      let success = true;
      const resWithStatus = { ...otpRes, success };
      return resWithStatus;
    } else {
      return { success: false };
    }
  } catch (err) {
    throw err;
  }
};

export default signupOtpDB;
