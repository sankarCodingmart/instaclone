import { Sequelize, Op } from "sequelize";
import { db } from "../../models";

const Account = db.account;
const Post = db.posts;
const User = db.user;
const Follow = db.follow;
const Mention = db.mention;
const Media = db.media;
const Highlight = db.highlight;

const getOtherProfile = async (req, res) => {
  let user_id = req.params.targetId;
  let id = req.params.userId;
  let account = await Account.findByPk(user_id, {
    include: {
      model: User,
    },
  });
  let follower = await Follow.findAll({
    where: {
      followee_id: user_id,
    },
  });
  let following = await Follow.findAll({
    where: {
      follower_id: user_id,
    },
  });
  let followBack = await Follow.findOne({
    where: {
      follower_id: user_id,
      followee_id: id,
    },
  });
  account = JSON.parse(JSON.stringify(account));
  follower = JSON.parse(JSON.stringify(follower));
  following = JSON.parse(JSON.stringify(following));
  let profilePageContent = {};
  if (account.User.private_account === true && followBack === null) {
    profilePageContent = {
      followerCount: follower.length,
      followingCount: following.length,
      userName: account.user_name,
      name: account.name,
      bio: account.User?.bio,
      accountType: "private",
    };
    return res.status(200).send(profilePageContent);
  }
  let hightlights = await Highlight.findAll({
    attributes: { exclude: ["user_id", "story_id"] },
    where: {
      user_id: user_id,
    },
  });
  let posts = await Post.findAll({
    attributes: ["post_id"],
    include: [
      {
        model: Account,
        where: {
          is_archived: false,
        },
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
      exclude: ["updatedAt", "user_id"],
      include: {
        model: Media,
        attributes: ["media_url", "post_type", "post_id"],
      },
    },
  });

  hightlights = JSON.parse(JSON.stringify(hightlights));
  posts = JSON.parse(JSON.stringify(posts));
  taggedPosts = JSON.parse(JSON.stringify(taggedPosts));
  // console.log(taggedPosts);
  profilePageContent = {
    followerCount: follower.length,
    followingCount: following.length,
    userName: account.user_name,
    name: account.name,
    bio: account.User?.bio,
    hightlights: hightlights,
    posts: posts,
    taggedPosts: taggedPosts,
    accountType: "public",
  };

  await res.status(200).send(profilePageContent);
};
export default getOtherProfile;
