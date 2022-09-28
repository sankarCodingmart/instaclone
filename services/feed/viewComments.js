import { db } from "../../models";
const Post = db.posts;
const Account = db.account;
const Mention = db.mention;
const Comment = db.comments;
const PostTag = db.postTag;
const User = db.user;
const CommentMention = db.commentMention;
const CommentTags = db.commentTags;

const viewComments = async (req, res) => {
  const { postId, userId } = req.body;
  const commentDetail = [];
  const comments = await Comment.findAll({
    where: {
      post_id: postId,
    },
    order: ["createdAt", "DESC"],
    include: [
      {
        model: Post,
        attributes: ["caption"],
        include: {
          model: Mention,
          attributes: ["mention_id", "user_name"],
        },
      },
      {
        model: Account,
        attributes: ["user_name"],
        include: {
          model: User,
          attributes: ["profile_pic_url"],
        },
      },
      {
        model: CommentMention,
        attributes: ["comment_id", "mention_id"],
      },
      {
        model: CommentTags,
        attributes: ["tag_id", "tag_name"],
      },
    ],
  });
  console.log(comments[0].dataValues);
  console.log(JSON.parse(JSON.stringify(comments)));
};
export default viewComments;
