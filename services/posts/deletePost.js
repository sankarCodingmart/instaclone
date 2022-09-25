import { db } from "../../models";
const Posts = db.posts;

const deletePost = async (req, res) => {
  let { post_id } = req.body;
  await Posts.destroy({
    where: {
      story_id: story_id,
    },
  });
  res.status(200).send("deleted successfully");
};
export default deletePost;
