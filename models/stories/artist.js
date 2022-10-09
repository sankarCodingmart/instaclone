import es from "../../config/es.config";
import { db } from "../index";
const saveDocument = async (instance) => {
  let include = { model: db.musicStatic };
  await instance.reload({ include: include });
  return await es.create({
    index: "artist",
    id: instance.dataValues.artist_id,
    body: {
      artist: instance.dataValues.artist_name,
      music_id: instance.dataValues.music_id,
      musicStatic: instance.dataValues.MusicStatic.dataValues,
    },
  });
};

const deleteDocument = (instance) => {
  return es.delete({
    index: "artist",
    id: instance.dataValues.artist_id,
  });
};

export default (sequelize, Sequelize) => {
  return sequelize.define(
    "Artist",
    {
      music_id: {
        type: Sequelize.INTEGER,
      },
      artist_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      artist_name: {
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
