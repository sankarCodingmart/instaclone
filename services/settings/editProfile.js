import { db } from "../../models";
const User = db.user;
const Account = db.account;
const editProfile = async (req, res) => {
  const { user_id, name, userName, bio, profilePicUrl } = req.body;
  await Account.update(
    {
      name: name,
      user_name: userName,
    },
    {
      where: {
        id: user_id,
      },
    }
  );
  await User.update(
    {
      bio: bio,
      profile_pic_url: profilePicUrl,
    },
    {
      where: {
        user_id: user_id,
      },
    }
  );
  res.status(200).send("Updated successfully");
};
export default editProfile;
