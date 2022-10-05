import { db } from "../../models";
import { Sequelize, Op } from "sequelize";
const Account = db.account;
const User = db.user;
const Message = db.message;
const Notes = db.notes;
const Follow = db.follow;
const CloseFriends = db.closeFriends;
const getMessagePage = async (req, res) => {
  let user_id = req.userId;
  let yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  let followerNotes = await Notes.findAll({
    attributes: ["user_id", "note_id", "note_content"],
    where: {
      user_id: {
        [Op.ne]: user_id,
      },
      createdAt: {
        [Op.gte]: yesterday,
      },
      only_close_friends: false,
    },
    include: [
      {
        model: Account,
        attributes: ["id", "user_name", "name"],
        include: [
          {
            model: Follow,
            attributes: ["follower_id"],
            as: "follower",
            where: {
              followee_id: user_id,
            },
          },
          {
            model: User,
            attributes: ["profile_pic_url"],
          },
        ],
      },
    ],
  });

  let closeFriendsNotes = await CloseFriends.findAll({
    attributes: ["target_id"],
    where: {
      user_id: user_id,
    },
    include: [
      {
        model: Account,
        include: [
          {
            model: Notes,
            attributes: ["note_id", "note_content"],
            where: {
              user_id: {
                [Op.ne]: user_id,
              },
              createdAt: {
                [Op.gte]: yesterday,
              },
              only_close_friends: true,
            },
            required: true,
          },
          {
            model: User,
            attributes: ["profile_pic_url"],
          },
        ],
      },
    ],
  });
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
  closeFriendsNotes = JSON.parse(JSON.stringify(closeFriendsNotes));
  followerNotes = JSON.parse(JSON.stringify(followerNotes));
  msgDetail = JSON.parse(JSON.stringify(msgDetail));
  msgDetail = msgDetail.filter((msg) => {
    return msg.User != null;
  });
  let msgPageDetail = {
    msgDetail: msgDetail,
    followerNotes: followerNotes,
    closeFriendsNotes: closeFriendsNotes,
  };
  res.status(200).send(msgPageDetail);
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

/*
let followerNotes = await Follow.findAll({
    where: {
      follower_id: user_id,
    },
    include: [
      {
        model: Account,
        as: "follower",
        attributes: ["id", "user_name", "name"],
        // required: true,
        include: [
          {
            model: Notes,
            attributes: ["note_id", "note_content"],
            where: {
              //   user_id: {
              //     [Op.ne]: user_id,
              //   },
              createdAt: {
                [Op.gte]: yesterday,
              },
              only_close_friends: false,
            },
            // required: true,
          },
          {
            model: User,
            attributes: ["profile_pic_url"],
          },
        ],
      },
    ],
  });
 */
