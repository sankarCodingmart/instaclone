import { db } from "../../models";

const SavedPost = db.savedPost;
const unSavePost = async (req, res) => {
  const { userId, postId, groupName } = req.body;
  await SavedPost.destroy({
    user_id: userId,
    post_id: postId,
    group_name: groupName,
  });
  res.status(200).send("unsaved successfully");
};
export default unSavePost;
