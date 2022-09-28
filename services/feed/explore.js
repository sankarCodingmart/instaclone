import { db } from "../../models";
import { Sequelize } from "sequelize";
const Account = db.account;
const Post = db.posts;
const Media = db.media;

const getExploreContent = async (req, res) => {
  const user_id = req.params.userId;
  let posts = await Post.findAll({
    attributes: ["post_id"],
    order: Sequelize.literal("random()"),
    limit: 15,
    include: [{ model: Media, attributes: ["media_url", "post_type"] }],
  });
  const exploreContent = [];
  const postAll = JSON.parse(JSON.stringify(posts));
  postAll.forEach((post) => {
    exploreContent.push({
      postId: post.post_id,
      media: post.Media,
    });
  });
  res.status(200).send(exploreContent);
};
export default getExploreContent;
