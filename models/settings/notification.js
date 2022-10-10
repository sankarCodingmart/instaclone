export default (sequelize, Sequelize) => {
  return sequelize.define("NotificationSettings", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    like: {
      type: Sequelize.INTEGER,
      default: 2,
    },
    photo: {
      type: Sequelize.INTEGER,
      default: 2,
    },
    comments: {
      type: Sequelize.INTEGER,
      default: 2,
    },
    comment_like: {
      type: Sequelize.INTEGER,
      default: 2,
    },
    first: {
      type: Sequelize.INTEGER,
      default: 2,
    },
    follower_req: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    accept_req: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    account_suggestion: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    message_req: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    message: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    message_reminder: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    unrecognized: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    reminder: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    recent_reel: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    most_watched_reel: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
  });
};
