import { db } from "../../models";

const Account = db.account;
const Follow = db.follow;
const Request = db.request;
const addFollower = async (req, res) => {
  const { followerId, followeeId, type } = req.body;
  // console.log(followerId, followeeId);
  if (type == 0) {
    await Follow.create({
      followee_id: followeeId,
      follower_id: followerId,
    });
  } else {
    await Request.create({
      requested_id: followeeId,
      request_id: followerId,
    });
  }
  res.status(200).send("Follower added");
};
export default addFollower;
