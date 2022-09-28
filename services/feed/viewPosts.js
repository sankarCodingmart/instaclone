import { db } from "../../models";
const Post = db.posts;
const Account = db.account;
const Media = db.media;
const Mention = db.mention;
const Comment = db.comments;
const PostTag = db.postTag;
const User = db.user;

const viewPosts = async (req, res) => {
  const post_id = req.params.postId;
  let posts = await Post.findOne({
    where: {
      post_id: post_id,
    },
    include: [
      {
        model: Account,
        attributes: ["id", "user_name", "name"],
        required: true,
      },
      {
        model: User,
        attributes: ["profile_pic_url"],
      },
      { model: Media, attributes: ["media_url", "post_type"] },
      { model: Mention, attributes: ["mention_id", "user_name"] },
      { model: PostTag, attributes: ["tag_id", "tag_name"] },
      {
        model: Comment,
        attributes: ["comment_id", "reply_id"],
      },
    ],
  });
  posts = JSON.parse(JSON.stringify(posts));
  postContent = [];
  posts.forEach((post) => {
    postContent.push({
      profileName: post?.Account?.Posts[0]?.user_name,
      likes: post?.Account?.Posts[0]?.likes,
      caption: post?.Account?.Posts[0]?.caption,
      commentCount: post?.Account?.Posts[0]?.Comments.length,
      media: post?.Account?.Posts[0]?.Media,
      postTags: post?.Account?.Posts[0]?.PostTags,
      mentions: post?.Account?.Posts[0]?.Mentions,
      reel: post?.Account?.Posts[0]?.reel,
    });
  });
  res.status(200).send(postContent);
};
export default viewPosts;
