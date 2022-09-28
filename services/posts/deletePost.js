import { db } from "../../models";
const Posts = db.posts;
const Mention = db.mention;
const Media = db.media;
const Music = db.music;
const PostTag = db.postTag;

const deletePost = async (req, res) => {
  let post_id = req.body.postId;

  await Mention.destroy({
    where: {
      post_id: post_id,
    },
  });
  await Media.destroy({
    where: {
      post_id: post_id,
    },
  });
  await PostTag.destroy({
    where: {
      post_id: post_id,
    },
  });
  await Music.destroy({
    where: {
      post_id: post_id,
    },
  });
  await Posts.destroy({
    where: {
      post_id: post_id,
    },
  });
  res.status(200).send("deleted successfully");
};
export default deletePost;
