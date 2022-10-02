import { db } from "../../models";
const Comment = db.comments;
const Posts = db.posts;
const Stories = db.stories;
const Likes = db.likes;
const StoryActivity = db.storyActivity;
const CommentActivity = db.commentActivity;
const PostActivity = db.postActivity;

const unlike = async (req, res) => {
  const {
    storyId = null,
    postId = null,
    commentId = null,
    userId,
    targetId,
    type,
  } = req.body;
  const post_id = postId;
  const comment_id = commentId;
  const story_id = storyId;
  if (type === 0) {
    const postLike = await Posts.findOne({
      attributes: ["likes"],
      where: {
        post_id: post_id,
      },
    });
    await Posts.update(
      {
        likes: Number(postLike.dataValues.likes) - 1,
      },
      {
        where: {
          post_id: post_id,
        },
      }
    );
    await Likes.destroy({
      user_id: userId,
      target_id: targetId,
      post_id: postId,
    });
    await PostActivity.destroy({
      user_id: userId,
      target_id: targetId,
      post_id: postId,
      type: 0,
    });
  } else if (type === 1) {
    const storyLike = await Stories.findOne({
      attributes: ["likes"],
      where: {
        story_id: story_id,
      },
    });
    await Stories.update(
      {
        likes: Number(storyLike.dataValues.likes) - 1,
      },
      {
        where: {
          story_id: story_id,
        },
      }
    );
    await Likes.destroy({
      user_id: userId,
      target_id: targetId,
      story_id: storyId,
    });
    await StoryActivity.destroy({
      user_id: userId,
      target_id: targetId,
      story_id: storyId,
      type: 1,
    });
  } else {
    const commentLike = await Comment.findOne({
      attributes: ["likes"],
      where: {
        comment_id: comment_id,
      },
    });
    await Comment.update(
      {
        likes: Number(commentLike.dataValues.likes) - 1,
      },
      {
        where: {
          comment_id: comment_id,
        },
      }
    );
    await Likes.destroy({
      user_id: userId,
      target_id: targetId,
      comment_id: commentId,
    });
    await CommentActivity.destroy({
      user_id: userId,
      target_id: targetId,
      comment_id: commentId,
      type: 2,
    });
  }
  res.status(200).send("Unliked successfully");
};

export default unlike;
