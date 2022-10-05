import { db } from "../../models";
import { Op } from "sequelize";
const User = db.user;
const Account = db.account;
const Message = db.message;
const viewMessages = async (req, res) => {
  const user_id = req.userId;
  const to_id = req.params.toId;
  let messages = await Message.findAll({
    attributes: ["message_content", "from_id", "createdAt"],
    where: {
      [Op.or]: {
        [Op.and]: {
          from_id: user_id,
          to_id: to_id,
        },
        [Op.and]: {
          from_id: to_id,
          to_id: user_id,
        },
      },
    },
  });
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
  messages = JSON.parse(JSON.stringify(messages));
  let message = {
    message: messages,
    profileDetails: JSON.parse(JSON.stringify(profileDetails)),
  };
  //   console.log(messages);
  await res.status(200).send(message);
};
export default viewMessages;
