import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import signupDB from "../db/signup";
import "dotenv/config";

const signupService = async (data: any) => {
  const password = bcrypt.hashSync(data.password, 10);

  data.password = password;

  const response: any = await signupDB(data);

  if (response.success == true) {
    if (!process.env.JWT_SECRET) {
      throw new Error("❌ JWT_SECRET is not defined in environment variables.");
    }

    let token = jwt.sign(
      { userId: response.user._id, email: response.user.email },
      process.env.JWT_SECRET
    );

    const resObj = {
      ...response,
      token,
    };

    return resObj;
  } else if (response.success == false) {
    return { success: false };
  } else {
    return response;
  }
};

export default signupService;
