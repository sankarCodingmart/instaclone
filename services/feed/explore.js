import { db } from "../../models";
import { Sequelize } from "sequelize";
const Account = db.account;
const Post = db.posts;
const Media = db.media;
const Comments = db.comments;

const getExploreContent = async (req, res) => {
  const user_id = req.params.userId;
  let posts = await Post.findAll({
    attributes: ["post_id"],
    order: Sequelize.literal("random()"),
    where: {
      reel: false,
    },
    limit: 16,
    include: [
      { model: Media, attributes: ["media_url", "post_type"] },
      {
        model: Comments,
      },
    ],
  });
  let reels = await Post.findAll({
    attributes: ["post_id"],
    order: Sequelize.literal("random()"),
    where: {
      reel: true,
    },
    limit: 4,
    include: [{ model: Media, attributes: ["media_url", "post_type"] }],
  });
  let postContent = [];
  posts.foreach((post) => {
    postContent.push({
      post_id: post.post_id,
      media: post.Media,
    });
  });
  // reels = JSON.parse(JSON.stringify(reels));
  // let postAll = JSON.parse(JSON.stringify(posts));
  // const half = Math.ceil(postAll.length / 4);
  // postContent.push(postAll.slice(0, half));
  // postContent.push(postAll.slice(half, half * 2));
  // postContent.push(postAll.slice(half * 2, half * 3));
  // postContent.push(postAll.slice(half * 3));
  // let j = 0;
  // for (let post of postContent) {
  //   post.unshift(reels[j++]);
  //   post.push(reels[j++]);
  // }
  res.status(200).send(postContent);
};
export default getExploreContent;
