import dbconfig from "../config/dbconnect.config";
import { Sequelize } from "sequelize";
import Account from "../models/account/account";
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
import Mention from "./account/mention";
import AccountPrivacy from "./settings/accountPrivacy";
import LoginActivity from "./settings/loginActivity";
import LimitActivity from "./settings/limitActivity";
import TwoFactorAuth from "./settings/twoFactorAuth";

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
  host: dbconfig.HOST,
  dialect: dbconfig.dialect,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

(async () => {
  await sequelize.sync({ force: true });
})();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.account = Account(sequelize, Sequelize);
db.follow = Follow(sequelize, Sequelize);
db.closeFriends = CloseFriends(sequelize, Sequelize);
db.posts = Posts(sequelize, Sequelize);
db.postTag = PostTag(sequelize, Sequelize);
db.savedPost = SavedPost(sequelize, Sequelize);
db.media = Media(sequelize, Sequelize);
db.stories = Stories(sequelize, Sequelize);
db.music = Music(sequelize, Sequelize);
db.artist = Artist(sequelize, Sequelize);
db.comments = Comments(sequelize, Sequelize);
db.mention = Mention(sequelize, Sequelize);
db.accountPrivacy = AccountPrivacy(sequelize, Sequelize);
db.loginActivity = LoginActivity(sequelize, Sequelize);
db.limitActivity = LimitActivity(sequelize, Sequelize);
db.twoFactorAuth = TwoFactorAuth(sequelize, Sequelize);

//Relations
db.account.hasMany(db.follow, {
  foreignKey: "follower_id",
});
db.account.hasMany(db.follow, {
  foreignKey: "followee_id",
});
db.account.hasMany(db.closeFriends, {
  foreignKey: "user_id",
});
db.account.hasMany(db.closeFriends, {
  foreignKey: "target_id",
});
db.account.hasMany(db.posts, {
  foreignKey: "user_id",
});
db.posts.hasMany(db.postTag, {
  foreignKey: "post_id",
});
db.savedPost.hasMany(db.posts);
db.posts.hasOne(db.savedPost, {
  foreignKey: "post_id",
});
db.account.hasMany(db.savedPost, {
  foreignKey: "user_id",
});
db.posts.hasMany(db.media, {
  foreignKey: "post_id",
});
db.account.hasMany(db.stories, {
  foreignKey: "post_id",
});
db.music.belongsToMany(db.artist, { through: "MusicArtist" });
db.artist.belongsToMany(db.music, { through: "MusicArtist" });
db.account.hasMany(db.comments, {
  foreignKey: "user_id",
});
db.comments.hasMany(db.comments, {
  foreignKey: "reply_id",
});
db.posts.hasMany(db.comments, {
  foreignKey: "post_id",
});
db.comments.belongsToMany(db.postTag, { through: "CommentTags" });
db.postTag.belongsToMany(db.comments, { through: "CommnetTags" });
db.account.hasMany(db.mention, {
  foreignKey: "user_id",
});
db.account.hasMany(db.accountPrivacy, {
  foreignKey: "user_id",
});
db.account.hasMany(db.accountPrivacy, {
  foreignKey: "target_id",
});
db.account.hasMany(db.loginActivity, {
  foreignKey: "user_id",
});
db.account.hasOne(db.limitActivity, {
  foreignKey: "user_id",
});
db.account.hasOne(db.twoFactorAuth, {
  foreignKey: "user_id",
});

export { db };
