import { db } from "../../models";
const User = db.user;
const NotificationSettings = db.notificationSettings;
const changeLoginInfo = async (req, res) => {
  const {
    userId,
    like,
    photo,
    comments,
    commentLike,
    first,
    followerReq,
    accountReq,
    accountSuggestion,
    messageRequest,
    message,
    messageReminder,
    unrecognized,
    reminder,
    recentReel,
    mostWatchedReel,
  } = req.body;
  NotificationSettings.update(
    {
      like: like,
      photo: photo,
      comments: comments,
      comment_like: commentLike,
      first: first,
      follower_req: followerReq,
      account_req: accountReq,
      account_suggestion: accountSuggestion,
      message_req: messageRequest,
      message: message,
      message_reminder: messageReminder,
      unrecognized: unrecognized,
      reminder: reminder,
      recent_reel: recentReel,
      most_watched_reel: mostWatchedReel,
    },
    {
      where: {
        user_id: userId,
      },
    }
  );
  res.status(200).send("notification settings changed successfully");
};
export default changeLoginInfo;
