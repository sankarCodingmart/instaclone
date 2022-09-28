import { db } from "../../models";

const Posts = db.posts;

const archivePost = async (req, res) => {
  const post_id = req.params.postId;
  await Posts.update(
    {
      is_archived: true,
    },
    {
      where: {
        post_id: post_id,
      },
    }
  );
};
export default archivePost;
