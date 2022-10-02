import { Op } from "sequelize";
import { db } from "../../models";
const Account = db.account;
const User = db.user;
const searchProfile = async (req, res) => {
  let user_name = req.params.userName;
  let userProfiles = await Account.findAll({
    attributes: ["id", "user_name", "name"],
    where: {
      [Op.or]: {
        user_name: {
          [Op.like]: `${user_name}%`,
        },
        name: {
          [Op.like]: `${user_name}%`,
        },
      },
    },
    include: [
      {
        model: User,
        attributes: ["profile_pic_url"],
      },
    ],
  });
  userProfiles = JSON.parse(JSON.stringify(userProfiles));
  res.status(200).send(userProfiles);
};
export default searchProfile;
