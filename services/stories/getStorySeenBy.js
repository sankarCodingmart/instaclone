import { db } from "../../models";

const SeenBy = db.seenBy;
const Stories = db.stories;
const Account = db.account;
const User = db.user;
const Likes = db.likes;

const getStorySeenBy = async (req, res) => {
  const story_id = req.parms.storyId;
  try {
    const seenByList = {};
    const seen = await SeenBy.findAll({
      where: {
        story_id: story_id,
      },
      include: [
        {
          model: Stories,
          attributes: [""],
          include: [
            {
              model: Account,
              attributes: ["user_name", "id"],
              include: [
                {
                  model: User,
                  attributes: ["profile_pic_url"],
                },
              ],
            },
            {
              model: Likes,
              attributes: ["user_id"],
            },
          ],
        },
      ],
    });
    seen = JSON.parse(JSON.stringify(seen));
    console.log(seen);
    return res.status(200).send(seen);
  } catch (err) {
    res.status(400).send(err);
  }
};

export default getStorySeenBy;
