import { Sequelize } from "sequelize";
import { db } from "../../models";

const Account = db.account;
const Follow = db.follow;
const User = db.user;

const getFollowers = async (req, res) => {
  const user_id = req.params.userId;
  let result = await Follow.findAll({
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

  result = JSON.parse(JSON.stringify(result));
  // await result.forEach(async (acc) => {
  //   // acc.abc = "hello";
  //   acc.followBack = false;
  //   const mutual = await Follow.findOne({
  //     where: {
  //       follower_id: acc.followee_id,
  //       followee_id: acc.follower_id,
  //     },
  //   });
  //   if (mutual) acc.followBack = true;
  // });
  let followerContent = [];

  await result.forEach(async (follower) => {
    // let result = null;
    // console.log(result);
    console.log(follower);
    followerContent.push({
      followerId: follower?.followee_id,
      userName: follower.following.user_name,
      name: follower.following.name,
      profilePicUrl: follower?.following?.User?.profile_pic_url,
      followBack: follower.followBack,
    });
  });
  res.status(200).send(followerContent);
};
export default getFollowers;
