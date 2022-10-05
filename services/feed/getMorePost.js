import { Sequelize, Op } from "sequelize";
import { db } from "../../models";

const Account = db.account;
const Post = db.posts;
const Comments = db.comments;
const User = db.user;
const Follow = db.follow;
const Mention = db.mention;
const PostTag = db.postTag;
const Media = db.media;

const getMorePosts = async (req, res) => {
  const user_id = userId;
  const offset = req.params.offset;
  let morePosts = [];
  const postsFive = await Post.findAll({
    limit: 5,
    offset: 5 * offset,
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
            [Op.ne]: user_id,
          },
        },
        include: [
          {
            model: Follow,
            attributes: ["follower_id"],
            as: "follower",
            required: true,
            where: {
              followee_id: user_id,
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
  let result = JSON.parse(JSON.stringify(postsFive));
  console.log(JSON.parse(JSON.stringify(postsFive)));
  result?.forEach((posts) => {
    morePosts.push({
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
  res.status(200).send(postsFive);
};
export default getMorePosts;
