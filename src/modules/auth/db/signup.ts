import otpModel from "../../../../mongodb/otpModel";
import userModel from "../../../../mongodb/userModel";

const signupDB = async (data: any) => {
  try {
    const otpRes: any = await otpModel.findOne({ email: data.email });
    if (data.otp == otpRes.otp) {
      const user = await userModel.create(data);
      const resUser = { user, success: true };
      return resUser;
    } else {
      return { success: false };
    }
  } catch (err) {
    throw err;
  }
};

export default signupDB;
