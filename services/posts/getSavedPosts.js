import { db } from "../../models";

const Post = db.posts;
const Media = db.media;
const SavedPost = db.savedPost;

const getSavedPosts = async (req, res) => {
  const user_id = req.userId;
  let savedPostContents = {};
  let savedPost = await SavedPost.findAll({
    where: {
      user_id: user_id,
    },
    include: [
      {
        model: Post,
        attributes: ["post_id"],
        include: {
          model: Media,
          attributes: ["media_url", "post_type", "post_id"],
        },
      },
    ],
  });
  console.log(savedPost);
  await res.status(200).send(savedPostContents);
};

export default getSavedPosts;
