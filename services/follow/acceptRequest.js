import { db } from "../../models";

const Account = db.account;
const Follow = db.follow;
const Request = db.request;
const acceptRequest = async (req, res) => {
  const { followerId, followeeId, type } = req.body;
  await Request.destroy({
    requested_id: followerId,
    request_id: followeeId,
  });
  await Follow.create({
    followee_id: followeeId,
    follower_id: followerId,
  });
};
export default acceptRequest;
