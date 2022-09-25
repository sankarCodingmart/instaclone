import { db } from "../../models";

const Account = db.account;
const Stories = db.stories;
const StoryMedia = db.storyMedia;
const StoryMention = db.storyMention;
const Music = db.music;
const Stickers = db.stickers;

const viewStory = async (req, res) => {
  try {
    let storyContent = {};
    let { user_id } = req.body;
    const result = await Stories.findAll({
      where: {
        user_id: user_id,
      },
      include: [
        {
          model: Account,
          attributes: ["id", "user_name"],
        },
        {
          model: StoryMedia,
        },
        {
          model: StoryMention,
        },
        {
          model: Music,
        },
        {
          model: Stickers,
        },
      ],
    });
    console.log(JSON.stringify(result));
    const storyData = JSON.stringify(result);
    storyContent.profile = {
      profileUserName: storyData.user_name,
    };
    res.status(200).send(JSON.stringify(storyContent));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export default viewStory;
