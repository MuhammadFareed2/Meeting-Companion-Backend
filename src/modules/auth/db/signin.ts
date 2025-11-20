import userModel from "../../../../mongodb/userModel";

const signinDB = async (data: { email: string }) => {
  const email = data.email.trim().toLowerCase();
  return await userModel.findOne({ email });
};

export default signinDB;