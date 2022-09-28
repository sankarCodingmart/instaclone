import { db } from "../../models";

const Account = db.account;
const Follow = db.follow;
const User = db.user;

const getFollowing = async (req, res) => {
  const user_id = req.params.userId;
  let following = await Follow.findAll({
    where: {
      followee_id: user_id,
    },
    as: "following",
    include: {
      model: Account,
      attributes: ["id", "user_name", "name"],
      include: {
        model: User,
        attributes: ["profile_pic_url"],
      },
    },
  });
  let followingContent = [];
  following = JSON.parse(JSON.stringify(following));
  following.forEach(async (follower) => {
    let result = null;
    console.log(result);
    followingContent.push({
      followerId: follower?.followee_id,
      userName: follower.following.user_name,
      name: follower.following.name,
      profilePicUrl: follower?.following?.User?.profile_pic_url,
      //   followBack: followBack,
    });
  });
  res.status(200).send(followingContent);
};
export default getFollowing;
