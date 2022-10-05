import { Op, Sequelize } from "sequelize";
import { db } from "../../models";
const MusicStatic = db.musicStatic;
const PostTag = db.postTag;
const Artist = db.artist;
const Location = db.location;
const Posts = db.posts;
const searchExplore = async (req, res) => {
  let searchString = req.body.searchString;
  let type = req.body.type;
  if (type == 0) {
    let result = await MusicStatic.findAll({
      exclude: ["createdAt", "updatedAt"],
      where: {
        music_name: {
          [Op.iLike]: `${searchString}%`,
        },
      },
      include: [
        {
          model: Artist,
          attributes: ["artist_name"],
        },
      ],
    });
    result = JSON.parse(JSON.stringify(result));
    res.status(200).send(result);
  } else if (type == 1) {
    let result = await PostTag.findAll({
      attributes: ["post_id", "tag_name"],
      where: {
        tag_name: {
          [Op.like]: `${searchString}%`,
        },
      },
    });
    // let re = await Posts.findAll({
    //   attributes: ["post_id"],
    //   include: {
    //     model: PostTag,
    //     attributes: ["tag_id"],
    //     where: {
    //       tag_name: {
    //         [Op.like]: `${searchString}%`,
    //       },
    //     },
    //   },
    // });
    result = JSON.parse(JSON.stringify(re));
    console.log(result);

    // result = JSON.parse(JSON.stringify(result));
    res.status(200).send(result);
  } else {
    let result = await Location.findAll({
      where: {
        location_name: {
          [Op.like]: `%${searchString}%`,
        },
      },
    });
    result = JSON.parse(JSON.stringify(result));
    res.status(200).send(result);
  }
};
export default searchExplore;
