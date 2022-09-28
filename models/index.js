import dbconfig from "../config/dbconnect.config";
import { Sequelize } from "sequelize";
import Account from "../models/account/account";
import User from "../models/account/user";
import Follow from "../models/account/follow";
import CloseFriends from "./account/closeFriends";
import Posts from "./posts/post";
import PostTag from "./posts/postTag";
import SavedPost from "./posts/savedPost";
import Media from "./posts/media";
import Stories from "./stories/stories";
import Music from "./stories/music";
import Artist from "./stories/artist";
import Comments from "./comments/comments";
import Mention from "./posts/mention";
import AccountPrivacy from "./settings/accountPrivacy";
import LoginActivity from "./activity/loginActivity";
import LimitActivity from "./settings/limitActivity";
import TwoFactorAuth from "./settings/twoFactorAuth";
import Request from "./account/request";
import StoryMention from "./stories/storyMention";
import createRecords from "../test";
import MusicStatic from "./static/musicStatic";
import StickerStatic from "./static/stickerStatic";
import Stickers from "./stories/stickers";
import StoryMedia from "./stories/storyMedia";
import Location from "./static/location";
import Highlight from "./stories/highlight";
import CommentMention from "./comments/commentMention";
import CommentTags from "./comments/commentTags";
import Message from "./message/message";
import Likes from "./account/likes";
import UserSettings from "./settings/userSettings";
import CommentActivity from "./activity/commentActivity";
import PostActivity from "./activity/postActivity";
import StoryActivity from "./activity/storyActivity";
import Otp from "./account/otp";

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
  host: dbconfig.HOST,
  dialect: dbconfig.dialect,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

// (async () => {
//   await sequelize.sync({ force: true });
//   console.log("Drop and Resync DB");
// })();

// (async () => {
//   await sequelize.sync({ alter: true });
//   console.log("Alter and Resync DB");
// })();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.account = Account(sequelize, Sequelize);
db.user = User(sequelize, Sequelize);
db.follow = Follow(sequelize, Sequelize);
db.closeFriends = CloseFriends(sequelize, Sequelize);
db.posts = Posts(sequelize, Sequelize);
db.postTag = PostTag(sequelize, Sequelize);
db.savedPost = SavedPost(sequelize, Sequelize);
db.media = Media(sequelize, Sequelize);
db.stories = Stories(sequelize, Sequelize);
db.musicStatic = MusicStatic(sequelize, Sequelize);
db.artist = Artist(sequelize, Sequelize);
db.comments = Comments(sequelize, Sequelize);
db.mention = Mention(sequelize, Sequelize);
db.accountPrivacy = AccountPrivacy(sequelize, Sequelize);
db.loginActivity = LoginActivity(sequelize, Sequelize);
db.limitActivity = LimitActivity(sequelize, Sequelize);
db.twoFactorAuth = TwoFactorAuth(sequelize, Sequelize);
db.request = Request(sequelize, Sequelize);
db.storyMention = StoryMention(sequelize, Sequelize);
db.stickers = Stickers(sequelize, Sequelize);
db.stickerStatic = StickerStatic(sequelize, Sequelize);
db.music = Music(sequelize, Sequelize);
db.storyMedia = StoryMedia(sequelize, Sequelize);
db.location = Location(sequelize, Sequelize);
db.highlight = Highlight(sequelize, Sequelize);
db.commentMention = CommentMention(sequelize, Sequelize);
db.commentTags = CommentTags(sequelize, Sequelize);
db.message = Message(sequelize, Sequelize);
db.likes = Likes(sequelize, Sequelize);
db.userSettings = UserSettings(sequelize, Sequelize);
db.commentActivity = CommentActivity(sequelize, Sequelize);
db.postActivity = PostActivity(sequelize, Sequelize);
db.storyActivity = StoryActivity(sequelize, Sequelize);
db.otp = Otp(sequelize, Sequelize);
//Relations
//User
db.account.hasOne(db.user, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.user.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//follow
db.account.hasOne(db.follow, {
  foreignKey: "follower_id",
  as: "follower",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.follow.belongsTo(db.account, {
  foreignKey: "follower_id",
  as: "follower",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.account.hasMany(db.follow, {
  foreignKey: "followee_id",
  as: "following",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.follow.belongsTo(db.account, {
  foreignKey: "followee_id",
  as: "following",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Close friends
db.account.hasMany(db.closeFriends, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.account.hasMany(db.closeFriends, {
  foreignKey: "target_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.closeFriends.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.closeFriends.belongsTo(db.account, {
  foreignKey: "target_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Posts
db.account.hasMany(db.posts, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.posts.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Post tags
db.posts.hasMany(db.postTag, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.postTag.belongsTo(db.posts, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Post music
db.music.hasMany(db.posts, {
  foreignKey: "music_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.posts.belongsTo(db.music, {
  foreignKey: "music_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Saved posts
db.account.hasMany(db.savedPost, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.savedPost.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.posts.hasOne(db.savedPost, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.savedPost.belongsTo(db.posts, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Media
db.posts.hasMany(db.media, {
  foreignKey: { name: "post_id", allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.media.belongsTo(db.posts, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//stories
db.account.hasMany(db.stories, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.location.hasMany(db.stories, {
  foreignKey: "location_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.stories.belongsTo(db.location, {
  foreignKey: "location_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.stories.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Music & Artist
db.musicStatic.hasMany(db.artist, {
  foreignKey: "music_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.artist.belongsTo(db.musicStatic, {
  foreignKey: "music_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.musicStatic.hasMany(db.music, {
  foreignKey: "music_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.music.belongsTo(db.musicStatic, {
  foreignKey: "music_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Comments
db.account.hasMany(db.comments, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.comments.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.comments.hasMany(db.comments, {
  foreignKey: "reply_id",
  as: "Comment",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.comments.belongsTo(db.comments, {
  foreignKey: "reply_id",
  as: "Reply",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.posts.hasMany(db.comments, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.comments.belongsTo(db.posts, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Comment Tags
db.posts.hasMany(db.commentTags, {
  foreignKey: "comment_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.commentTags.belongsTo(db.posts, {
  foreignKey: "comment_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Mentions
db.account.hasOne(db.mention, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.account.hasMany(db.mention, {
  foreignKey: "mention_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.posts.hasMany(db.mention, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.location.hasMany(db.posts, {
  foreignKey: "location_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.mention.belongsTo(db.posts, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.posts.belongsTo(db.location, {
  foreignKey: "location_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.mention.belongsTo(db.account, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Account Privacy
db.account.hasMany(db.accountPrivacy, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.account.hasMany(db.accountPrivacy, {
  foreignKey: "target_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.accountPrivacy.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.accountPrivacy.belongsTo(db.account, {
  foreignKey: "target_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Login Activity
db.account.hasMany(db.loginActivity, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.loginActivity.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Limit Activity
db.account.hasOne(db.limitActivity, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.limitActivity.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Two Factor Auth
db.account.hasOne(db.twoFactorAuth, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.twoFactorAuth.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Requests
db.account.hasMany(db.request, {
  foreignKey: "request_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.account.hasMany(db.request, {
  foreignKey: "requested_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.request.belongsTo(db.account, {
  foreignKey: "request_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.request.belongsTo(db.account, {
  foreignKey: "requested_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Story Mentions
db.account.hasOne(db.storyMention, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.account.hasMany(db.storyMention, {
  foreignKey: "mention_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.stories.hasMany(db.storyMention, {
  foreignKey: "story_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.storyMention.belongsTo(db.stories, {
  foreignKey: "story_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.storyMention.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.storyMention.belongsTo(db.account, {
  foreignKey: "mention_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Stickers
db.stories.hasMany(db.stickers, {
  foreignKey: "story_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.stickers.belongsTo(db.stories, {
  foreignKey: "story_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.stickerStatic.hasMany(db.stickers, {
  foreignKey: "sticker_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.stickers.belongsTo(db.stickerStatic, {
  foreignKey: "sticker_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Story Media
db.stories.hasMany(db.storyMedia, {
  foreignKey: "story_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.storyMedia.belongsTo(db.stories, {
  foreignKey: "story_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Story Music
db.music.hasMany(db.stories, {
  foreignKey: "music_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.stories.belongsTo(db.music, {
  foreignKey: "music_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.highlight.belongsToMany(db.stories, { through: "HighlightedStories" });
db.stories.belongsToMany(db.highlight, { through: "HighlightedStories" });
db.account.hasMany(db.highlight, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.highlight.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Comment Mentions
db.account.hasOne(db.commentMention, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.account.hasMany(db.commentMention, {
  foreignKey: "mention_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.comments.hasMany(db.commentMention, {
  foreignKey: "comment_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.commentMention.belongsTo(db.comments, {
  foreignKey: "comment_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.commentMention.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.commentMention.belongsTo(db.account, {
  foreignKey: "mention_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Message
db.posts.hasOne(db.message, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.message.belongsTo(db.posts, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.account.hasMany(db.message, {
  foreignKey: "from_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.account.hasMany(db.message, {
  foreignKey: "to_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.message.belongsTo(db.account, {
  foreignKey: "from_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.message.belongsTo(db.account, {
  foreignKey: "to_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Likes
db.stories.hasMany(db.likes, {
  foreignKey: "story_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.likes.belongsTo(db.stories, {
  foreignKey: "story_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.posts.hasMany(db.likes, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.likes.belongsTo(db.posts, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.comments.hasMany(db.likes, {
  foreignKey: "comment_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.likes.belongsTo(db.comments, {
  foreignKey: "comment_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.account.hasMany(db.likes, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.account.hasMany(db.likes, {
  foreignKey: "target_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.likes.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.likes.belongsTo(db.account, {
  foreignKey: "target_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.account.hasOne(db.userSettings, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.userSettings.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//post Activity
db.account.hasMany(db.postActivity, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.postActivity.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.account.hasMany(db.postActivity, {
  foreignKey: "target_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.postActivity.belongsTo(db.account, {
  foreignKey: "target_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.posts.hasMany(db.postActivity, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.postActivity.belongsTo(db.posts, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Story Activity
db.account.hasMany(db.storyActivity, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.storyActivity.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.account.hasMany(db.storyActivity, {
  foreignKey: "target_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.storyActivity.belongsTo(db.account, {
  foreignKey: "target_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.stories.hasMany(db.storyActivity, {
  foreignKey: "story_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.storyActivity.belongsTo(db.stories, {
  foreignKey: "story_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Comment Activity
db.account.hasMany(db.commentActivity, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.commentActivity.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.account.hasMany(db.commentActivity, {
  foreignKey: "target_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.commentActivity.belongsTo(db.account, {
  foreignKey: "target_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.comments.hasMany(db.commentActivity, {
  foreignKey: "comment_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.commentActivity.belongsTo(db.comments, {
  foreignKey: "comment_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

createRecords(db);

export { db };
