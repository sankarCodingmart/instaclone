import { db } from "../../models";

const Account = db.account;
const Stories = db.stories;
const StoryMedia = db.storyMedia;
const StoryMention = db.storyMention;
const Music = db.music;
const Stickers = db.stickers;
const User = db.user;
const MusicStatic = db.musicStatic;
const StickerStatic = db.stickerStatic;
const Artist = db.artist;

const viewStory = async (req, res) => {
  try {
    let storyContent = {};
    // console.log(req.params);
    let user_id = req.params.userId;
    console.log(user_id);
    const result = await Stories.findAll({
      where: {
        user_id: user_id,
      },
      include: [
        {
          model: Account,
          attributes: ["id", "user_name"],
          include: {
            model: User,
            attributes: ["profile_pic_url"],
          },
        },
        { model: StoryMedia, attributes: ["media_url", "story_type"] },
        { model: StoryMention, attributes: ["mention_id", "user_name"] },
        {
          model: Music,
          attributes: ["music_id"],
          include: [
            {
              model: MusicStatic,
              attributes: [
                "music_name",
                "music_thumbnail_url",
                "genre",
                "music_url",
              ],
              include: {
                model: Artist,
                attributes: ["artist_name"],
              },
            },
          ],
        },
        {
          model: Stickers,
          attributes: ["sticker_id"],
          include: [
            {
              model: StickerStatic,
              attributes: ["sticker_name", "sticker_url"],
            },
          ],
        },
      ],
    });
    // console.log(JSON.stringify(result));
    const storyData = JSON.parse(JSON.stringify(result));
    // console.log(storyData);
    storyContent = {
      profileUserName: storyData[0]?.Account?.user_name,
      story_id: storyData[0]?.story_id,
      storyMedia: storyData[0]?.StoryMedia,
      storyMention: storyData[0]?.StoryMention,
      storyMusic: storyData[0]?.Music,
      storySticker: storyData[0]?.Sticker,
    };
    res.status(200).send(storyContent);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export default viewStory;
