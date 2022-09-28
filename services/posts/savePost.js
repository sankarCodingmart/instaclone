import { db } from "../../models";

const Posts = db.posts;
const SavedPost = db.savedPost;
const savePost = async (req, res) => {
  const { userId, postId, groupName } = req.body;
  await SavedPost.create({
    user_id: userId,
    post_id: postId,
    group_name: groupName,
  });
};
export default savePost;