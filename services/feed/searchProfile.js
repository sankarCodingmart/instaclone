import { Op } from "sequelize";
import { db } from "../../models";
import es from "../../config/es.config";
const Account = db.account;
const User = db.user;
const searchProfile = async (req, res) => {
  let user_name = req.params.userName;

  let userProfiles = await es.search({
    index: "user",
    query: {
      multi_match: {
        query: user_name,
        type: "phrase_prefix",
        fields: ["account.user_name", "account.name"],
      },
    },
    _source_includes: [
      "profile_pic_url",
      "account.name",
      "account.user_name",
      "account.id",
      "profile_story",
    ],
  });
  userProfiles = userProfiles.hits.hits;
  // console.log(userProfiles);
  // let userProfiles = await Account.findAll({
  //   attributes: ["id", "user_name", "name"],
  //   where: {
  //     [Op.or]: {
  //       user_name: {
  //         [Op.like]: `${user_name}%`,
  //       },
  //       name: {
  //         [Op.like]: `${user_name}%`,
  //       },
  //     },
  //   },
  //   include: [
  //     {
  //       model: User,
  //       attributes: ["profile_pic_url"],
  //     },
  //   ],
  // });
  // userProfiles = JSON.parse(JSON.stringify(userProfiles));
  res.status(200).send(userProfiles);
};
export default searchProfile;
