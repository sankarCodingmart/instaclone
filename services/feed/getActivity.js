import { Sequelize, Op } from "sequelize";
import { db } from "../../models";

const Account = db.account;
const User = db.user;
const CommentActivity = db.commentActivity;
const LoginActivity = db.loginActivity;
const PostActivity = db.postActivity;
const StoryActivity = db.storyActivity;
const Comments = db.comments;
const Stories = db.stories;
const Media = db.media;
const Posts = db.posts;
const StoryMedia = db.storyMedia;

const getActivities = async (req, res) => {
  try {
    const user_id = req.params.userId;

    let commentActivities = CommentActivity.findAll({
      where: {
        target_id: user_id,
      },
      include: [
        {
          model: Account,
          attributes: ["user_name"],
          include: [
            {
              model: User,
              attributes: ["profile_pic_url"],
            },
          ],
        },
        {
          model: Comments,
          attributes: ["comment_content", "comment_id"],
        },
      ],
    });
    commentActivities = JSON.parse(JSON.stringify(commentActivities));
    console.log(commentActivities);
    let storyActivities = StoryActivity.findAll({
      where: {
        target_id: user_id,
      },
      include: [
        {
          model: Account,
          attributes: ["user_name"],
          include: [
            {
              model: User,
              attributes: ["profile_pic_url"],
            },
          ],
        },
        {
          model: Stories,
          attributes: ["story_id"],
          include: [
            {
              model: StoryMedia,
              attributes: ["media_url"],
            },
          ],
        },
      ],
    });
    let postActivities = PostActivity.findAll({
      where: {
        target_id: user_id,
      },
      include: [
        {
          model: Account,
          attributes: ["user_name"],
          include: [
            {
              model: User,
              attributes: ["profile_pic_url"],
            },
          ],
        },
        {
          model: Posts,
          attributes: ["post_id"],
          include: [
            {
              model: Media,
              attributes: ["media_url"],
            },
          ],
        },
      ],
    });
    console.log(JSON.parse(JSON.stringify(postActivities)));
    postActivities = JSON.parse(JSON.stringify(postActivities));
    storyActivities = JSON.parse(JSON.stringify(storyActivities));
    let Activities = {
      postActivities: postActivities,
      storyActivities: storyActivities,
      commentActivities: commentActivities,
    };
    return res.status(200).send(Activities);
  } catch (err) {
    res.status(500).send(err);
  }
};
export default getActivities;
