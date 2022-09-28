import { db } from "../../models";

const Account = db.account;
const Post = db.posts;
const Comments = db.comments;
const User = db.user;
const Mention = db.mention;
const PostTag = db.postTag;
const Media = db.media;

const getTaggedPosts = async (req, res) => {
  const user_id = req.params.userId;
  let posts = await Mention.findAll({
    where: {
      mention_id: user_id,
    },
    include: [
      {
        model: Account,
        attributes: ["id", "user_name", "name"],
        required: true,
        include: [
          {
            model: Post,
            attributes: [
              "post_id",
              "caption",
              "likes",
              "location",
              "createdAt",
              "reel",
              "music_id",
            ],
            include: [
              { model: Media, attributes: ["media_url", "post_type"] },
              { model: Mention, attributes: ["mention_id", "user_name"] },
              { model: PostTag, attributes: ["tag_id", "tag_name"] },
              {
                model: Comments,
                attributes: ["comment_id"],
              },
            ],
            // where: {
            //   user_id: {
            //     [Op.ne]: account.id,
            //   },
            // },
            // required: true,
          },
          {
            model: User,
            attributes: ["profile_pic_url"],
          },
        ],
      },
    ],
  });
  posts = JSON.parse(JSON.stringify(posts));
  // console.log(posts);
  let taggedPostsContent = [];
  posts.forEach((post) => {
    taggedPostsContent.push({
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

  // console.log(taggedPostsContent);
  await res.status(200).send(taggedPostsContent);
};

export default getTaggedPosts;
