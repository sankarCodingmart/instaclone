import { db } from "../../models";
import { Sequelize, Op } from "sequelize";
const Account = db.account;
const User = db.user;
const Message = db.message;
const sequelize = db.sequelize;
const Follow = db.follow;
const getMessagePage = async (req, res) => {
  let user_id = req.params.userId;

  let msgDetail = await Account.findAll({
    attributes: ["user_name"],
    include: [
      {
        model: Message,
        as: "ToTable",
        attributes: ["message_content", "to_id"],
        where: {
          [Op.or]: {
            from_id: user_id,
            to_id: user_id,
          },
        },
        order: [["createdAt", "DESC"]],
        // group: ["ToTable.to_id"],
        limit: 1,
      },
      {
        model: User,
        attributes: ["profile_pic_url"],
      },
    ],
  });
  msgDetail = JSON.parse(JSON.stringify(msgDetail));
  msgDetail = msgDetail.filter((msg) => {
    return msg.User != null;
  });
  res.status(200).send(msgDetail);
};
export default getMessagePage;

//   let msgDetail = await Follow.findAll({
//     attributes: [
//       [Sequelize.fn("DISTINCT", Sequelize.col("follower_id")), "follower"],
//     ],
//   });

//   let msgDetail = await Message.findAll({
//     where: {
//       [Op.or]: {
//         from_id: user_id,
//         to_id: user_id,
//       },
//     },
//     // as: "FromTable",
//     attributes: ["to_id", "message_content"],
//     // distinct: true,
//     order: [["createdAt", "DESC"]],
//     // group: ["FromTable.id"],
//     include: [
//       {
//         model: Account,
//         as: "FromTable",
//         attributes: ["user_name"],
//         include: {
//           model: User,
//           attributes: ["profile_pic_url"],
//         },
//       },
//     ],
//   });
