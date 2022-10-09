import { Sequelize, Op } from "sequelize";
import { db } from "../../models";

const Account = db.account;
const Post = db.posts;
const Stories = db.stories;
const Comments = db.comments;
const User = db.user;
const Follow = db.follow;
const Mention = db.mention;
const PostTag = db.postTag;
const Media = db.media;
const Highlight = db.highlight;

const getProfilePage = async (req, res) => {
  let user_id = req.params.userId;
  let account = await Account.findByPk(user_id, {
    include: {
      model: User,
    },
  });
  let follower = await Follow.findAll({
    attributes: [
      [
        db.sequelize.fn("COUNT", db.sequelize.col("followee_id")),
        "followCount",
      ],
    ],
    where: {
      followee_id: user_id,
    },
  });
  let following = await Follow.findAll({
    attributes: [
      [
        db.sequelize.fn("COUNT", db.sequelize.col("follower_id")),
        "followCount",
      ],
    ],
    where: {
      follower_id: user_id,
    },
  });
  let hightlights = await Highlight.findAll({
    attributes: { exclude: ["user_id"] },
    where: {
      user_id: user_id,
    },
  });
  let posts = await Post.findAll({
    attributes: ["post_id"],
    where: {
      is_archived: false,
    },
    include: [
      {
        model: Account,
        attributes: ["user_name"],
        where: {
          id: user_id,
        },
        required: true,
      },
      { model: Media, attributes: ["media_url", "post_type", "post_id"] },
    ],
  });

  let taggedPosts = await Mention.findAll({
    where: {
      mention_id: user_id,
    },
    include: {
      model: Post,
      where: {
        is_archived: false,
      },
      exclude: ["updatedAt", "user_id"],
      include: {
        model: Media,
        attributes: ["media_url", "post_type", "post_id"],
      },
    },
  });

  account = JSON.parse(JSON.stringify(account));
  follower = JSON.parse(JSON.stringify(follower));
  following = JSON.parse(JSON.stringify(following));
  hightlights = JSON.parse(JSON.stringify(hightlights));
  posts = JSON.parse(JSON.stringify(posts));
  taggedPosts = JSON.parse(JSON.stringify(taggedPosts));
  // console.log(taggedPosts);
  let profilePageContent = {};
  profilePageContent = {
    followerCount: Number(follower[0].followCount),
    followingCount: Number(following[0].followCount),
    userName: account.user_name,
    name: account.name,
    bio: account.User?.bio,
    hightlights: hightlights,
    posts: posts,
    taggedPosts: taggedPosts,
  };

  await res.status(200).send(profilePageContent);
};
export default getProfilePage;
