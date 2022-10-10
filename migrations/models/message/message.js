import es from "../../config/es.config";
import { db } from "../index";
const saveDocument = async (instance) => {
  // let include = [
  //   { model: db.account, as: "FromTable" },
  //   { model: db.account, as: "ToTable" },
  // ];
  // await instance.reload({ include: include });
  // console.log(instance);
  return await es.create({
    index: "message",
    id: instance.dataValues.message_id,
    body: {
      from_id: instance.dataValues.from_id,
      to_id: instance.dataValues.to_id,
      message_content: instance.dataValues.message_content,
      post_id: instance.dataValues.post_id,
      createdAt: instance.dataValues.createdAt,
      // from_acc: instance.dataValues.FromTable.dataValues,
      // to_acc: instance.dataValues.ToTable.dataValues,
    },
  });
};

const deleteDocument = (instance) => {
  return es.delete({
    index: "message",
    id: instance.dataValues.message_id,
  });
};
export default (sequelize, Sequelize) => {
  return sequelize.define(
    "Message",
    {
      message_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      from_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      to_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      message_content: {
        type: Sequelize.STRING,
      },
      post_id: {
        type: Sequelize.INTEGER,
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
