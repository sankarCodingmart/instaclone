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
  console.log(post_id);
  let posts = await Post.findOne({
    where: {
      post_id: post_id,
    },
    include: [
      {
        model: Account,
        attributes: ["id", "user_name", "name"],
        required: true,
        include: [
          {
            model: User,
            attributes: ["profile_pic_url"],
          },
        ],
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
  let post = JSON.parse(JSON.stringify(posts));

  // console.log(post);
  let postContent = {
    profileName: post.Account.user_name,
    likes: post.likes,
    caption: post.caption,
    location: post.location,
    reel: post.reel,
    musicId: post.music_id,
    createdAt: post.createdAt,
    postTags: post.PostTags,
    mentions: post.postMentions,
    comments: post.Comments,
    media: post.Media,
  };

  res.status(200).send(postContent);
};
export default viewPosts;
