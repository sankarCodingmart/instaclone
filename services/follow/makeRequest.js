import { db } from "../../models";
const Request = db.request;
const makeRequest = async (req, res) => {
  const { followerId, followeeId } = req.body;
  await Request.create({
    requested_id: followerId,
    request_id: followeeId,
  });
  res.status(200).send("request created successfully");
};
export default makeRequest;
