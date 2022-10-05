import { db } from "../../models";
import { Sequelize } from "sequelize";

const Post = db.posts;
const PostTag = db.postTag;
const Media = db.media;

const getHashTagPosts = async (req, res) => {
  const tag_name = req.body.tagName;
  const type = req.body.type;
  let hashTagPosts;
  try {
    if (type == 0) {
      hashTagPosts = await Post.findAll({
        order: Sequelize.literal("random()"),
        where: {
          is_archived: false,
        },
        attributes: ["post_id", "reel"],
        limit: 15,
        include: [
          {
            model: PostTag,
            where: {
              tag_name: tag_name,
            },
            required: true,
          },
          {
            model: Media,
            attributes: ["media_url", "post_type"],
          },
        ],
      });
    } else if (type == 1) {
      hashTagPosts = await Post.findAll({
        order: [["createdAt", "DESC"]],
        attributes: ["post_id", "reel"],
        where: {
          reel: false,
          is_archived: false,
        },
        limit: 15,
        include: [
          {
            model: PostTag,
            where: {
              tag_name: tag_name,
            },
          },
          {
            model: Media,
            attributes: ["media_url", "post_type"],
          },
        ],
      });
    } else {
      hashTagPosts = await Post.findAll({
        attributes: ["post_id", "reel"],
        order: Sequelize.literal("random()"),
        where: {
          reel: true,
          is_archived: false,
        },
        limit: 15,
        include: [
          {
            model: PostTag,
            attributes: ["tag_id"],
            where: {
              tag_name: tag_name,
            },
          },
          {
            model: Media,
            attributes: ["media_url", "post_type"],
          },
        ],
      });
    }
  } catch (err) {
    res.status(200).send({ err: err.message });
  }
  let hashTagPostContent = [];
  hashTagPosts = JSON.parse(JSON.stringify(hashTagPosts));
  //   console.log(hashTagPosts);
  hashTagPosts.forEach((res) => {
    hashTagPostContent.push({
      post_id: res.post_id,
      media: res.Media,
      reel: res.reel,
    });
  });
  // console.log(taggedPostsContent);
  await res.status(200).send(hashTagPostContent);
};

export default getHashTagPosts;
