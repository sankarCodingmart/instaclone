import es from "../../config/es.config";
const saveDocument = async (instance) => {
  return await es.create({
    index: "location",
    id: instance.dataValues.location_id,
    body: {
      location_name: instance.dataValues.location_name,
    },
  });
};

const deleteDocument = (instance) => {
  return es.delete({
    index: "location",
    id: instance.dataValues.location_id,
  });
};

export default (sequelize, Sequelize) => {
  return sequelize.define(
    "Location",
    {
      location_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      location_name: {
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
