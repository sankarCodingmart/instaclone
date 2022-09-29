import { db } from "../../models";

const SeenBy = db.seenBy;

const changeSeenBy = async (req, res) => {
  const user_id = req.params.userId;
  const story_id = req.parms.storyId;
  try {
    await SeenBy.create({
      story_id: story_id,
      user_id: user_id,
    });
    res.status(200).send("seenby changed successful");
  } catch (err) {
    res.status(400).send(err);
  }
};

export default changeSeenBy;
