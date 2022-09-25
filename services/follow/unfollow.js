import { db } from "../../models";

const Account = db.account;
const Follow = db.follow;

const addFollower = async (req, res) => {
  const { followerId, followeeId } = req.body;
  await Follow.destroy({
    where: {
      followee_id: followeeId,
      follower_id: followerId,
    },
  });
};
export default addFollower;
