import { db } from "../../models";

const Posts = db.posts;
const Media = db.media;
const getArchivedPosts = async (req, res) => {
  let userId = req.userId;
  const post_id = req.body.postId;
  try {
    let archived = await Posts.findAll({
      attributes: ["post_id"],
      where: {
        user_id: userId,
        is_archived: true,
      },
      include: {
        model: Media,
        attributes: ["media_url", "post_type", "post_id"],
      },
    });
    archived = JSON.parse(JSON.stringify(archived));
    res.status(200).send(archived);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};
export default getArchivedPosts;
