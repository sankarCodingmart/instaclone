import { db } from "../../models";

const Posts = db.posts;

const unArchivePost = async (req, res) => {
  const post_id = req.body.postId;
  try {
    await Posts.update(
      {
        is_archived: false,
      },
      {
        where: {
          post_id: post_id,
        },
      }
    );
    res.status(200).send("Unarchived Successfully");
  } catch (err) {
    res.status(500).send({ err });
  }
};
export default unArchivePost;
