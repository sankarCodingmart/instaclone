import { db } from "../../models";

const Account = db.account;
const CommentActivity = db.commentActivity;
const CommentMention = db.commentMention;
const Comment = db.comments;
const CommentTags = db.commentTags;
const createComment = async (req, res) => {
  const {
    userId,
    replyId = null,
    postId,
    likes = 0,
    mentions,
    commentTags,
    comment_content,
  } = req.body;
  console.log(replyId);
  const obj = {
    user_id: userId,
    reply_id: replyId,
    post_id: postId,
    likes: likes,
    comment_content: comment_content,
  };
  const comment = await Comment.create(obj);
  commentTags?.forEach(async (tag) => {
    tag.comment_id = comment.dataValues.comment_id;
    await CommentTags.create(tag);
  });
  mentions?.forEach(async (mention) => {
    mention.user_id = userId;
    mention.comment_id = comment.dataValues.comment_id;
    const mentionAcc = await Account.findByPk(mention.mention_id);
    mention.user_name = mentionAcc.dataValues.user_name;
    await CommentMention.create(mention);
    await CommentActivity.create({
      user_id: userId,
      target_id: mention.mention_id,
      comment_id: comment.dataValues.comment_id,
      type: 1,
    });
  });
  res.status(200).send("comment created successfully");
};
export default createComment;
