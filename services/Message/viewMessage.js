import { db } from "../../models";
import { Op } from "sequelize";
import es from "../../config/es.config";
const User = db.user;
const Account = db.account;
const Message = db.message;
const viewMessages = async (req, res) => {
  const user_id = req.userId;
  const to_id = req.params.toId;
  let messages = await es.search({
    index: "message",
    query: {
      bool: {
        should: [
          {
            term: {
              from_id: user_id,
            },
            term: {
              to_id: to_id,
            },
          },
          {
            term: {
              from_id: to_id,
            },
            term: {
              to_id: user_id,
            },
          },
        ],
      },
    },
    sort: [{ createdAt: { order: "desc" } }],
  });
  // let messages = await Message.findAll({
  //   attributes: ["message_content", "from_id", "createdAt"],
  //   where: {
  //     [Op.or]: {
  //       [Op.and]: {
  //         from_id: user_id,
  //         to_id: to_id,
  //       },
  //       [Op.and]: {
  //         from_id: to_id,
  //         to_id: user_id,
  //       },
  //     },
  //   },
  // });
  const profileDetails = await User.findOne({
    attributes: ["profile_pic_url"],
    where: {
      user_id: to_id,
    },
    include: {
      model: Account,
      attributes: ["user_name", "name"],
    },
  });
  // messages = JSON.parse(JSON.stringify(messages));
  messages = messages.hits.hits;
  let message = {
    message: [],
    profileDetails: JSON.parse(JSON.stringify(profileDetails)),
  };
  messages.forEach((msg) => {
    message.message.push({
      from_id: msg._source.from_id,
      to_id: msg._source.to_id,
      message_content: msg._source.message_content,
      post_id: msg._source.post_id,
      createdAt: msg._source.createdAt,
    });
  });
  //   console.log(messages);
  await res.status(200).send(message);
};
export default viewMessages;
