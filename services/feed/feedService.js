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
        profilePicUrl: acc?.User?.profile_pic_url,
      });
    });
    let yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    let followerStories = await Account.findAll({
      attributes: ["user_name", "name", "id"],
      include: [
        {
          model: Follow,
          as: "follower",
          where: {
            followee_id: account.id,
          },
        },
        {
          model: Stories,
          attributes: ["story_id"],
          where: {
            createdAt: {
              [Op.gte]: yesterday,
            },
            only_close_friends: false,
          },
        },
        {
          model: User,
          attributes: ["profile_pic_url"],
        },
      ],
    });
    console.log(JSON.parse(JSON.stringify(followerStories)));

    let closeFriendsStories = await Account.findAll({
      attributes: ["user_name", "name", "id"],
      include: [
        {
          model: CloseFriends,
          where: {
            target_id: account.id,
          },
        },
        {
          model: Stories,
          attributes: ["story_id"],
          where: {
            createdAt: {
              [Op.gte]: yesterday,
            },
            only_close_friends: true,
          },
        },
        {
          model: User,
          attributes: ["profile_pic_url"],
        },
      ],
    });
    closeFriendsStories = JSON.parse(JSON.stringify(closeFriendsStories));
    feedContent.closeFriendsStories = [];
    closeFriendsStories.forEach((acc) => {
      if (acc.Stories.length > 0) {
        feedContent.closeFriendsStories.push({
          profilePicUrl: acc.User.profile_pic_url,
          profileUserName: acc.user_name,
          userId: acc.id,
        });
      }
    });
    let result = JSON.parse(JSON.stringify(followerStories));
    feedContent.storiesSection = [];
    // console.log(result);
    result.forEach((acc) => {
      if (acc.Stories.length > 0) {
        feedContent.storiesSection.push({
          profilePicUrl: acc.User?.profile_pic_url,
          profileUserName: acc.user_name,
          userId: acc.id,
        });
      }
      // console.log(acc.Account.Stories);
    });

    const postsFive = await Post.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
      where: {
        is_archived: false,
      },
      include: [
        {
          model: Account,
          attributes: ["user_name", "name"],
          where: {
            id: {
              [Op.ne]: account.id,
            },
          },
          include: [
            {
              model: Follow,
              attributes: ["follower_id"],
              as: "follower",
              required: true,
              where: {
                followee_id: account.id,
              },
            },
            {
              model: User,
              attributes: ["profile_pic_url"],
            },
          ],
        },
        { model: Media, attributes: ["media_url", "post_type"] },
        { model: Mention, attributes: ["mention_id", "user_name"] },
        { model: PostTag, attributes: ["tag_id", "tag_name"] },
        {
          model: Comments,
          attributes: ["comment_id"],
        },
      ],
    });
    console.log(JSON.parse(JSON.stringify(postsFive)));

    result = JSON.parse(JSON.stringify(postsFive));
    // console.log(result);
    feedContent.postSection = [];
    result?.forEach((posts) => {
      feedContent.postSection.push({
        postId: posts.post_id,
        profilePicUrl: posts.Account.User?.profile_pic_url,
        profileName: posts.Account.user_name,
        likes: posts?.likes,
        caption: posts?.caption,
        commentCount: posts.Comments?.length,
        media: posts?.Media,
        postTags: posts?.PostTags,
        mentions: posts?.Mentions,
        reel: posts?.reel,
      });
    });
    await res.status(200).send(feedContent);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
export default getFeedContent;

/********** */
/*

let followerStories = await Stories.findAll({
      attributes: ["user_id"],
      where: {
        user_id: {
          [Op.ne]: account.id,
        },
        createdAt: {
          [Op.gte]: yesterday,
        },
        only_close_friends: false,
      },
      include: [
        {
          model: Account,
          attributes: ["id", "user_name", "name"],
          include: [
            {
              model: Follow,
              attributes: ["follower_id"],
              as: "follower",
              where: {
                followee_id: account.id,
              },
            },
            {
              model: User,
              attributes: ["profile_pic_url"],
            },
          ],
        },
      ],
    });


    // let closeFriendsStories = await CloseFriends.findAll({
    //   attributes: ["target_id"],
    //   where: {
    //     user_id: account.id,
    //   },
    //   include: [
    //     {
    //       model: Account,
    //       include: [
    //         {
    //           model: Stories,
    //           attributes: ["story_id"],
    //           where: {
    //             user_id: {
    //               [Op.ne]: account.id,
    //             },
    //             createdAt: {
    //               [Op.gte]: yesterday,
    //             },
    //             only_close_friends: true,
    //           },
    //           required: true,
    //         },
    //         {
    //           model: User,
    //           attributes: ["profile_pic_url"],
    //         },
    //       ],
    //     },
    //   ],
    // });
       // const fivePosts = await Follow.findAll({
    //   where: {
    //     follower_id: account.id,
    //   },
    //   limit: 5,
    //   include: [
    //     {
    //       model: Account,
    //       as: "following",
    //       attributes: ["id", "user_name", "name"],
    //       include: [
    //         {
    //           model: Post,
    //           attributes: [
    //             "post_id",
    //             "caption",
    //             "likes",
    //             "location",
    //             "createdAt",
    //             "reel",
    //             "music_id",
    //           ],
    //           include: [
    //             // { model: Media, attributes: ["media_url", "post_type"] },
    //             // { model: Mention, attributes: ["mention_id", "user_name"] },
    //             // { model: PostTag, attributes: ["tag_id", "tag_name"] },
    //             // {
    //             //   model: Comments,
    //             //   attributes: ["comment_id"],
    //             // },
    //           ],
    //           limit: 1,
    //           // order: Sequelize.literal("random()")
    //           order: [["createdAt", "DESC"]],
    //           where: {
    //             user_id: {
    //               [Op.ne]: account.id,
    //             },
    //           },
    //           // required: true,
    //         },
    //         {
    //           model: User,
    //           attributes: ["profile_pic_url"],
    //         },
    //       ],
    //     },
    //   ],
    // });
*/
