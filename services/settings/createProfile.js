import { db } from "../../models";
const User = db.user;
const Account = db.account;
const createProfile = async (req, res) => {
  const {
    userId,
    bio,
    profilePicUrl,
    websiteUrl,
    privateAccount = false,
  } = req.body;

  await User.create({
    user_id: userId,
    bio: bio,
    profile_pic_url: profilePicUrl,
    private_account: privateAccount,
    websiteUrl: websiteUrl,
  });
  res.status(200).send("Updated successfully");
};
export default createProfile;
