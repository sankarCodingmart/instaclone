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
const CloseFriends = db.closeFriends;

const getFeedContent = async (req, res) => {
  try {
    const feedContent = {};
    let user_id = req.params.userId;
    let account = await Account.findOne({
      where: {
        id: user_id,
      },
      include: {
        model: User,
      },
    });
    account = JSON.parse(JSON.stringify(account));
    feedContent.profile = {
      profilePicUrl: account.User.profile_pic_url,
      profileUserName: account.user_name,
      profileName: account.name,
      profileStory: account.User.profile_story,
    };
    let randomAccounts = await Account.findAll({
      order: Sequelize.literal("random()"),
      attributes: ["name", "user_name"],
      limit: 5,
      include: {
        model: User,
        attributes: ["profile_pic_url"],
      },
    });
    feedContent.suggestionSection = [];
    randomAccounts = JSON.parse(JSON.stringify(randomAccounts));
    // console.log(randomAccounts);
    randomAccounts.forEach(async (acc) => {
      feedContent.suggestionSection.push({
        profileName: acc.name,
        profileUserName: acc.user_name,
        profilePicUrl: acc?.User.profile_pic_url,
      });
    });
    let yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    let followerStories = await Follow.findAll({
      where: {
        follower_id: account.id,
      },
      include: [
        {
          model: Account,
          attributes: ["id", "user_name", "name"],
          required: true,
          include: [
            {
              model: Stories,
              attributes: ["story_id"],
              where: {
                user_id: {
                  [Op.ne]: account.id,
                },
                createdAt: {
                  [Op.gte]: yesterday,
                },
                only_close_friends: false,
              },
              required: true,
            },
            {
              model: User,
              attributes: ["profile_pic_url"],
            },
          ],
        },
      ],
    });
    let closeFriendsStories = await CloseFriends.findAll({
      attributes: ["target_id"],
      where: {
        user_id: account.id,
      },
      include: [
        {
          model: Stories,
          attributes: ["story_id"],
          where: {
            user_id: {
              [Op.ne]: account.id,
            },
            createdAt: {
              [Op.gte]: yesterday,
            },
            only_close_friends: true,
          },
          required: true,
        },
        {
          model: User,
          attributes: ["profile_pic_url"],
        },
      ],
    });
    closeFriendsStories = JSON.parse(JSON.stringify(closeFriendsStories));
    feedContent.closeFriendsStories = [];
    closeFriendsStories.forEach((stories) => {
      feedContent.closeFriendsStories.push({
        profilePicUrl: acc.Account.User.profile_pic_url,
        profileUserName: acc.Account.user_name,
      });
    });
    let result = JSON.parse(JSON.stringify(followerStories));
    feedContent.storiesSection = [];
    // console.log(result);
    result.forEach((acc) => {
      feedContent.storiesSection.push({
        profilePicUrl: acc.Account.User.profile_pic_url,
        profileUserName: acc.Account.user_name,
      });
      // console.log(acc.Account.Stories);
    });

    const fivePosts = await Follow.findAll({
      where: {
        follower_id: account.id,
      },
      include: [
        {
          model: Account,
          attributes: ["id", "user_name", "name"],
          required: true,
          include: [
            {
              model: Post,
              attributes: [
                "post_id",
                "caption",
                "likes",
                "location",
                "createdAt",
                "reel",
                "music_id",
              ],
              include: [
                { model: Media, attributes: ["media_url", "post_type"] },
                { model: Mention, attributes: ["mention_id", "user_name"] },
                { model: PostTag, attributes: ["tag_id", "tag_name"] },
                {
                  model: Comments,
                  attributes: ["comment_id"],
                },
              ],
              limit: 5,
              order: Sequelize.literal("random()"),
              where: {
                user_id: {
                  [Op.ne]: account.id,
                },
              },
              required: true,
            },
            {
              model: User,
              attributes: ["profile_pic_url"],
            },
          ],
        },
      ],
    });
    result = JSON.parse(JSON.stringify(fivePosts));
    // console.log(result);
    feedContent.postSection = [];
    result.forEach((posts) => {
      console.log(posts.Account.Posts);
      feedContent.postSection.push({
        // profilePicUrl: posts.Account.User?.profile_pic_url,
        profileName: posts?.Account?.Posts[0]?.user_name,
        likes: posts?.Account?.Posts[0]?.likes,
        caption: posts?.Account?.Posts[0]?.caption,
        commentCount: posts?.Account?.Posts[0]?.Comments.length,
        media: posts?.Account?.Posts[0]?.Media,
        postTags: posts?.Account?.Posts[0]?.PostTags,
        mentions: posts?.Account?.Posts[0]?.Mentions,
        reel: posts?.Account?.Posts[0]?.reel,
      });
    });
    await res.status(200).send(feedContent);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
export default getFeedContent;
