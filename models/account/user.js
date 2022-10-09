import es from "../../config/es.config";
import { db } from "../index";
const saveDocument = async (instance) => {
  let include = { model: db.account };
  await instance.reload({ include: include });
  return await es.create({
    index: "user",
    id: instance.dataValues.user_id,
    body: {
      profile_pic_url: instance.dataValues.profile_pic_url,
      private_account: instance.dataValues.private_account,
      bio: instance.dataValues.bio,
      website_url: instance.dataValues.website_url,
      profile_story: instance.dataValues.profile_story,
      account: instance.dataValues.Account.dataValues,
    },
  });
};

const deleteDocument = (instance) => {
  return es.delete({
    index: "user",
    id: instance.dataValues.user_id,
  });
};
export default (sequelize, Sequelize) => {
  return sequelize.define(
    "User",
    {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      profile_pic_url: {
        type: Sequelize.STRING,
      },
      private_account: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      bio: {
        type: Sequelize.STRING,
      },
      website_url: {
        type: Sequelize.STRING,
      },
      profile_story: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      timestamps: true,

      hooks: {
        afterCreate: saveDocument,
        afterUpdate: saveDocument,
        afterDestroy: deleteDocument,
      },
    }
  );
};
