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
import LoginActivity from "./settings/loginActivity";
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
db.highilght = Highlight(sequelize, Sequelize);
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
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.follow.belongsTo(db.account, {
  foreignKey: "follower_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.account.hasMany(db.follow, {
  foreignKey: "followee_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.follow.belongsTo(db.account, {
  foreignKey: "followee_id",
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
db.musicStatic.belongsToMany(db.artist, { through: "MusicArtist" });
db.artist.belongsToMany(db.musicStatic, { through: "MusicArtist" });
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
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.comments.belongsTo(db.comments, {
  foreignKey: "reply_id",
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
db.comments.belongsToMany(db.postTag, { through: "CommentTags" });
db.postTag.belongsToMany(db.comments, { through: "CommentTags" });

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

db.highilght.belongsToMany(db.stories, { through: "HightlightedStories" });
db.stories.belongsToMany(db.highilght, { through: "HightlightedStories" });
db.account.hasMany(db.highilght, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.highilght.belongsTo(db.account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

createRecords(db);

export { db };
