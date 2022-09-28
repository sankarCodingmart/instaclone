import { db } from "../../models";

const Follow = db.follow;
const Request = db.request;
const acceptRequest = async (req, res) => {
  const { followerId, followeeId } = req.body;
  await Request.destroy({
    requested_id: followerId,
    request_id: followeeId,
  });
  await Follow.create({
    followee_id: followeeId,
    follower_id: followerId,
  });
  await res.status(200).send("Request accepted added");
};
export default acceptRequest;
