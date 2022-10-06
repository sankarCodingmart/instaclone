import { db } from "../../models";

const Account = db.account;
const Stories = db.stories;
const StoryMedia = db.storyMedia;
const StoryMention = db.storyMention;
const Music = db.music;
const Stickers = db.stickers;
const Highlight = db.highlight;
const MusicStatic = db.musicStatic;
const Artist = db.artist;
const StickerStatic = db.stickerStatic;

const viewHighlight = async (req, res) => {
  try {
    let highlightContent = {};
    let user_id = req.params.userId;
    let highlight_id = req.params.highlightId;
    console.log(highlight_id);
    const result = await Highlight.findAll({
      include: [
        {
          model: Account,
          attributes: ["id", "user_name"],

          //       include: [
          //         {
          //           model: Stories,
          //           include: [
          //             { model: StoryMedia, attributes: ["media_url", "post_type"] },
          //             {
          //               model: StoryMention,
          //               attributes: ["mention_id", "user_name"],
          //             },
          //             {
          //               model: Music,
          //               attributes: ["music_id"],
          //               include: [
          //                 {
          //                   model: MusicStatic,
          //                   attributes: [
          //                     "music_name",
          //                     "music_thumbnail_url",
          //                     "genre",
          //                     "music_url",
          //                   ],
          //                   include: {
          //                     model: Artist,
          //                     attributes: ["artist_name"],
          //                   },
          //                 },
          //               ],
          //             },
          //             {
          //               model: Stickers,
          //               attributes: ["sticker_id"],
          //               include: [
          //                 {
          //                   model: StickerStatic,
          //                   attributes: ["sticker_name", "sticker_url"],
          //                 },
          //               ],
          //             },
          //           ],
          //         },
          //       ],
        },
        {
          model: Stories,
          include: [
            {
              model: StoryMedia,
              attributes: ["media_url", "story_type"],
            },
            {
              model: StoryMention,
              attributes: ["mention_id", "user_name"],
            },
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
        },
      ],
      where: {
        highlight_id: highlight_id,
      },
    });
    console.log(JSON.parse(JSON.stringify(result)));
    const highlightData = JSON.parse(JSON.stringify(result));
    highlightData.forEach((highlight) => {
      highlightContent.highlightName = highlight.highlight_name;
      highlightContent.highlightUrl = highlight.highlight_url;
      console.log(highlight.Stories);
      // highlight.Stories.forEach((story) => {
      //   highlightContent.stories.push({
      //     story_id: story.story_id,
      //     storyMedia: story.StoryMedia,
      //     storyMention: story.StoryMention,
      //     storyMusic: story.Music,
      //     storySticker: story.Sticker,
      //   });
      // });
    });
    await res.status(200).send(highlightContent);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export default viewHighlight;
