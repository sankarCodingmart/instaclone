import { db } from "../../models";
const User = db.user;
const UserSettings = db.userSettings;
const changeLoginInfo = async (req, res) => {
  const { userId, saveLoginInfo } = req.body;
  UserSettings.update(
    {
      save_login_info: saveLoginInfo,
    },
    {
      where: {
        user_id: userId,
      },
    }
  );
  res.status(200).send("Privacy changed successfully");
};
export default changeLoginInfo;
