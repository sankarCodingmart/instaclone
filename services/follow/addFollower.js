import { db } from "../../models";

const Account = db.account;
const Follow = db.follow;
const Request = db.request;
const addFollower = async (req, res) => {
  const { followerId, followeeId, type } = req.body;
  if (type == 0) {
    await Follow.create({
      followee_id: followeeId,
      follower_id: followerId,
    });
  } else {
    await Request.create({
      requested_id: followerId,
      request_id: followeeId,
    });
  }
};
export default addFollower;
