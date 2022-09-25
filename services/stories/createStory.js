import { db } from "../../models";

const Account = db.account;
const Stories = db.stories;
const StoryMedia = db.storyMedia;
const StoryMention = db.storyMention;
const Music = db.music;
const Stickers = db.stickers;

const createStory = async (req, res) => {
  try {
    let { account, media, storyDetails, stickers, music, mentions } = req.body;
    storyDetails.user_id = account.id;
    account = await Account.findByPk(account.id);
    let story = await Stories.create(storyDetails);
    story = story.dataValues;
    media.story_id = story.story_id;
    await StoryMedia.create(media);
    stickers?.forEach(async (sticker) => {
      sticker.story_id = story.story_id;
      await Stickers.create(sticker);
    });
    if (music) {
      music.story_id = story.story_id;
      await Music.create(music);
    }
    mentions?.forEach(async (mention) => {
      mention.user_id = account.dataValues.id;
      console.log(mention.user_id);
      mention.story_id = story.story_id;
      const mentionAcc = await Account.findByPk(mention.mention_id);
      mention.user_name = mentionAcc.dataValues.user_name;
      await StoryMention.create(mention);
    });
    await res.status(200).send("Story created successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};
export default createStory;
