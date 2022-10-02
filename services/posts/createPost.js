import { db } from "../../models";

const Account = db.account;
const Post = db.posts;
const Media = db.media;
const PostTag = db.postTag;
const Mention = db.mention;
const Music = db.music;
const PostActivity = db.postActivity;

const createPost = async (req, res) => {
  try {
    let { account, media, postDetails, postTags, mentions, music } = req.body;
    postDetails.user_id = account.id;
    postDetails.is_archived = false;
    account = await Account.findByPk(account.id);
    const post = await Post.create(postDetails);
    const post_id = post.dataValues.post_id;

    media.post_id = post_id;
    await Media.create(media);
    postTags.forEach(async (tag) => {
      tag.post_id = post_id;
      await PostTag.create(tag);
    });
    if (music) {
      music.post_id = post_id;
      await Music.create(music);
    }
    mentions.forEach(async (mention) => {
      mention.user_id = account.dataValues.id;
      mention.post_id = post_id;
      const mentionAcc = await Account.findByPk(mention.mention_id);
      mention.user_name = mentionAcc.dataValues.user_name;
      await PostActivity.create({
        user_id: account.dataValues.id,
        target_id: mention.mention_id,
        post_id: post_id,
        type: 1,
      });
      await Mention.create(mention);
    });
    return await res.status(200).send("successfully created");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

export default createPost;
