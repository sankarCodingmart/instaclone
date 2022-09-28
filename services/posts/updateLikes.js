import { db } from "../../models";
const Comment = db.comments;
const Posts = db.posts;
const Stories = db.stories;
const Likes = db.likes;
const StoryActivity = db.storyActivity;
const CommentActivity = db.commentActivity;
const PostActivity = db.postActivity;

const updateLikes = async (req, res) => {
  const {
    storyId = null,
    postId = null,
    commentId = null,
    userId,
    targetId,
    type,
    likes,
  } = req.body;
  const post_id = postId;
  const comment_id = commentId;
  const story_id = storyId;
  if (type === 0) {
    await Posts.update({
      likes: likes,
      where: {
        post_id: post_id,
      },
    });
    await Likes.create({
      user_id: userId,
      target_id: targetId,
      post_id: postId,
    });
    await PostActivity.create({
      user_id: userId,
      target_id: targetId,
      post_id: postId,
      type: 0,
    });
  } else if (type === 1) {
    await Stories.update({
      likes: likes,
      where: {
        story_id: story_id,
      },
    });
    await Likes.create({
      user_id: userId,
      target_id: targetId,
      story_id: storyId,
    });
    await StoryActivity.create({
      user_id: userId,
      target_id: targetId,
      story_id: storyId,
      type: 0,
    });
  } else {
    await Comment.update({
      likes: likes,
      where: {
        comment_id: comment_id,
      },
    });
    await Likes.create({
      user_id: userId,
      target_id: targetId,
      comment_id: commentId,
    });
    await CommentActivity.create({
      user_id: userId,
      target_id: targetId,
      comment_id: commentId,
      type: 0,
    });
  }
  res.status(200).send("like updated successfully");
};

export default updateLikes;
