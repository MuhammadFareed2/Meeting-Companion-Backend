import signinDB from "../db/signin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface SigninData {
  email: string;
  password: string;
}

const signinService = async (data: SigninData) => {
  const user: any = await signinDB(data);
  if (!user) return { success: false, error: "User not found" };

  const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);
  if (!isPasswordCorrect) return { success: false, error: "Invalid credentials" };

  if (!process.env.JWT_SECRET) return { success: false, error: "Server configuration error" };

  const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { success: true, user: { email: user.email, _id: user._id }, token };
};

export default signinService;