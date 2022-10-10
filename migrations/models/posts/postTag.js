import es from "../../config/es.config";
import { db } from "../index";
const saveDocument = async (instance) => {
  await es.indices.putMapping({
    index: "post-tag",
    body: {
      properties: {
        tag_name: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
            },
          },
        },
        post_id: {
          type: "long",
        },
      },
    },
  });
  return await es.create({
    index: "post-tag",
    id: instance.dataValues.tag_id,
    body: {
      tag_name: instance.dataValues.tag_name,
      post_id: instance.dataValues.post_id,
    },
  });
};

const deleteDocument = (instance) => {
  return es.delete({
    index: "post-tag",
    id: instance.dataValues.tag_id,
  });
};
export default (sequelize, Sequelize) => {
  return sequelize.define(
    "PostTag",
    {
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tag_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tag_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        afterCreate: saveDocument,
        afterUpdate: saveDocument,
        afterDestroy: deleteDocument,
      },
    }
  );
};
