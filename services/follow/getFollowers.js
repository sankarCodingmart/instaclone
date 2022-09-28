import { Sequelize } from "sequelize";
import { db } from "../../models";
import follow from "../../models/account/follow";

const Account = db.account;
const Follow = db.follow;
const User = db.user;

const getFollowers = async (req, res) => {
  const user_id = req.params.userId;
  const result = await Follow.findAll({
    where: {
      follower_id: user_id,
    },
    include: [
      {
        as: "following",
        model: Account,
        attributes: ["id", "user_name", "name"],
        include: [
          {
            model: User,
            attributes: ["profile_pic_url"],
          },
        ],
      },
    ],
  });
  console.log(JSON.parse(JSON.stringify(result)));
  let followerContent = [];

  result.forEach(async (follower) => {
    let result = null;
    console.log(result);
    followerContent.push({
      followerId: follower?.followee_id,
      userName: follower.following.user_name,
      name: follower.following.name,
      profilePicUrl: follower?.following?.User?.profile_pic_url,
      //   followBack: followBack,
    });
  });
  res.status(200).send(followerContent);
};
export default getFollowers;
