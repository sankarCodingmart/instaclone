import { db } from "../../models";
const CloseFriends = db.closeFriends;

const removeCloseFriends = async (req, res) => {
  const { userIds } = req.body;
  userIds.forEach(async (userid) => {
    const { user_id, target_id } = userid;
    await CloseFriends.destroy({
      where: {
        user_id: user_id,
        target_id: target_id,
      },
    });
  });
  res.status(200).send("close friends created successfully");
};
export default removeCloseFriends;
