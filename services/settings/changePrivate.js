import { db } from "../../models";
const User = db.user;
const changeAccountType = async (req, res) => {
  const { accountType = false, userId } = req.body;
  await User.update(
    {
      private_account: accountType,
    },
    {
      where: {
        user_id: userId,
      },
    }
  );
  res.status(200).send("Updated successfully");
};
export default changeAccountType;
