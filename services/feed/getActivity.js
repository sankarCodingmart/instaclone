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
const Follow = db.follow;

const getActivities = async (req, res) => {
  try {
    const user_id = req.params.userId;
    let lastMonth = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);
    let yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    let dayBefore = new Date(new Date().getTime() - 48 * 60 * 60 * 1000);
    let lastweek = new Date(new Date().getTime() - 7 * 60 * 60 * 1000);
    // console.log(user_id);
    let commentActivitiesLastMonth = await CommentActivity.findAll({
      where: {
        target_id: user_id,
        createdAt: {
          [Op.gte]: lastMonth,
        },
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
          attributes: ["comment_content", "comment_id", "createdAt"],
        },
      ],
    });
    commentActivitiesLastMonth = JSON.parse(
      JSON.stringify(commentActivitiesLastMonth)
    );
    commentActivitiesLastMonth.forEach((comment) => {
      comment.activityType = "comment";
    });
    // console.log(commentActivities);
    let storyActivitiesLastMonth = await StoryActivity.findAll({
      where: {
        target_id: user_id,
        createdAt: {
          [Op.gte]: lastMonth,
        },
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
          attributes: ["story_id", "createdAt"],
          include: [
            {
              model: StoryMedia,
              attributes: ["media_url"],
            },
          ],
        },
      ],
    });
    let postActivitiesLastMonth = await PostActivity.findAll({
      where: {
        target_id: user_id,
        createdAt: {
          [Op.gte]: lastMonth,
        },
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

    let followActivitiesLastMonth = await Follow.findAll({
      attributes: ["followee_id", "createdAt"],
      where: {
        follower_id: user_id,
        createdAt: {
          [Op.gte]: lastMonth,
        },
      },
      include: [
        {
          model: Account,
          as: "follower",
          attributes: ["user_name"],
          include: [
            {
              model: User,
              attributes: ["profile_pic_url"],
            },
          ],
        },
      ],
    });
    // console.log(JSON.parse(JSON.stringify(postActivities)));
    postActivitiesLastMonth = JSON.parse(
      JSON.stringify(postActivitiesLastMonth)
    );
    postActivitiesLastMonth.forEach((post) => {
      post.activityType = "post";
    });
    storyActivitiesLastMonth = JSON.parse(
      JSON.stringify(storyActivitiesLastMonth)
    );
    storyActivitiesLastMonth.forEach((story) => {
      story.activityType = "story";
    });
    followActivitiesLastMonth = JSON.parse(
      JSON.stringify(followActivitiesLastMonth)
    );
    followActivitiesLastMonth.forEach((follow) => {
      follow.activityType = "follow";
    });
    let ActivitiesLastMonth = [
      ...postActivitiesLastMonth,
      ...storyActivitiesLastMonth,
      ...commentActivitiesLastMonth,
      ...followActivitiesLastMonth,
    ];
    let ActivitiesLastWeek = [];
    let ActivitiesYesterday = [];
    let ActivitiesToday = [];
    const act = ActivitiesLastMonth.sort((a, b) => {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    });
    ActivitiesLastMonth.forEach((activity) => {
      if (new Date(activity.createdAt) > yesterday) {
        ActivitiesToday.push(activity);
        var index = ActivitiesLastMonth.indexOf(activity);
        if (index !== -1) ActivitiesLastMonth.splice(index, 1);
      } else if (new Date(activity.createdAt) > dayBefore) {
        ActivitiesYesterday.push(activity);
        var index = ActivitiesLastMonth.indexOf(activity);
        if (index !== -1) ActivitiesLastMonth.splice(index, 1);
      } else if (new Date(activity.createdAt) > lastweek) {
        ActivitiesLastWeek.push(activity);
        var index = ActivitiesLastMonth.indexOf(activity);
        if (index !== -1) ActivitiesLastMonth.splice(index, 1);
      }
    });

    let Activities = {
      today: ActivitiesToday,
      yesterday: ActivitiesYesterday,
      lastWeek: ActivitiesLastWeek,
      lastMonth: ActivitiesLastMonth,
    };
    return res.status(200).send(Activities);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export default getActivities;
