import UserModel from "../models/users";
import dbConnect from "../utils/dbConnect";

const post = async (req, res) => {
  const { email } = req.body;

  await dbConnect();

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(200).json({ success: false, message: "invalid" });
  }

  return res.status(200).json({ success: true, message: "success" });
};

export { post };
