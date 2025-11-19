import userModel from "../../../../mongodb/userModel.ts";

const signinDB = async (data: any) => {
  try {
    const user = await userModel.findOne({ email: data.email });
    console.log(user);
    return user;
  } catch (err) {
    throw err;
  }
};
export default signinDB;
