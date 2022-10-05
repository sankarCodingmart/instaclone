import { db } from "../../models";

const Post = db.posts;
const Media = db.media;
const SavedPost = db.savedPost;

const getSavedPostGroups = async (req, res) => {
  const user_id = req.userId;
  let savedPostGroups = await SavedPost.findAll({
    attributes: ["group_name"],
    where: {
      user_id: user_id,
    },
    include: [
      {
        model: Post,
        attributes: ["post_id"],
        // limit: 4,
        include: {
          model: Media,
          attributes: ["media_url", "post_type", "post_id"],
        },
      },
    ],
  });
  savedPostGroups = JSON.parse(JSON.stringify(savedPostGroups));
  console.log(savedPostGroups);
  await res.status(200).send(savedPostGroups);
};

export default getSavedPostGroups;
