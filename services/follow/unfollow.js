import { db } from "../../models";

const Account = db.account;
const Follow = db.follow;

const unfollow = async (req, res) => {
  const { followerId, followeeId } = req.body;
  // console.log(followeeId, followerId);
  await Follow.destroy({
    where: {
      followee_id: followeeId,
      follower_id: followerId,
    },
  });
  res.status(200).send("Unfollowed successfully");
};
export default unfollow;
