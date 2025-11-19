import signinDB from "../db/signin.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const signinService = async (data: any) => {
  const user: any = await signinDB(data);
  const isPasswordCorrect = bcrypt.compareSync(data.password, user?.password);

  if (isPasswordCorrect) {
    if (!process.env.JWT_SECRET) {
      throw new Error("❌ JWT_SECRET is not defined in environment variables.");
    }
    let token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET
    );
    return {
      user,
      token: token,
      success: true,
    };
  } else {
    return { success: false };
  }
};
export default signinService;
