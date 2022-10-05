import { db } from "../../models";

const Posts = db.posts;
const SavedPost = db.savedPost;
const savePost = async (req, res) => {
  const { postId, groupName = "All" } = req.body;
  let userId = req.userId;
  await SavedPost.create({
    user_id: userId,
    post_id: postId,
    group_name: groupName,
  });
  res.status(200).send("saved successfully");
};
export default savePost;
