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
  const postId = req.params.postId;
  const user_id = req.params.userId;
  const commentDetail = [];
  try {
    const comments = await Comment.findAll({
      where: {
        post_id: postId,
      },
      order: [["createdAt", "DESC"]],
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
    // console.log(JSON.parse(JSON.stringify(comments)));
    comments.forEach((comment) => {
      commentDetail.push({
        commentId: comment.comment_id,
        userId: comment.user_id,
        likes: comment.likes,
        postId: comment.post_id,
        commentContent: comment.comment_content,
        createdAt: comment.createdAt,
        postSection: comment.Post,
        profileSection: comment.Account,
        commentMentions: comment.CommentMentions,
        commentTags: comment.CommentTags,
      });
    });
    res.status(200).send(commentDetail);
  } catch (err) {
    res.status(500).send(err);
  }
};
export default viewComments;
