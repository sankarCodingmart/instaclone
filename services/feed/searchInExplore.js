import { Op } from "sequelize";
import { db } from "../../models";
import es from "../../config/es.config";

const MusicStatic = db.musicStatic;
const PostTag = db.postTag;
const Artist = db.artist;
const Location = db.location;
const Posts = db.posts;
const searchExplore = async (req, res) => {
  let searchString = req.body.searchString;
  let type = req.body.type;
  if (type == 0) {
    let resultES = await es.search({
      index: "artist",
      query: {
        match_phrase_prefix: {
          "musicStatic.music_name": searchString,
        },
      },
      _source_excludes: ["musicStatic.createdAt", "musicStatic.updatedAt"],
    });
    const ans = resultES.hits.hits;

    let result = [];
    ans.forEach((music) => {
      let temp = { ...music._source.musicStatic };
      temp.artistId = music._id;
      temp.artistName = music?._source?.artist;
      result.push(temp);
    });
    res.status(200).send(result);
  } else if (type == 1) {
    let result = await es.search({
      index: "post-tag",
      query: {
        match_phrase_prefix: {
          tag_name: searchString,
        },
      },
      collapse: {
        field: "tag_name.keyword",
      },
    });

    // console.log(result.hits.hits);
    result = result.hits.hits;
    res.status(200).send(result);
  } else {
    let result = await es.search({
      index: "location",
      query: {
        match_phrase_prefix: {
          location_name: searchString,
        },
      },
    });
    // let result = await Location.findAll({
    //   where: {
    //     location_name: {
    //       [Op.like]: `%${searchString}%`,
    //     },
    //   },
    // });
    // result = JSON.parse(JSON.stringify(result));
    res.status(200).send(result);
  }
};
export default searchExplore;

// let result = await MusicStatic.findAll({
//   exclude: ["createdAt", "updatedAt"],
//   where: {
//     music_name: {
//       [Op.iLike]: `${searchString}%`,
//     },
//   },
//   include: [
//     {
//       model: Artist,
//       attributes: ["artist_name"],
//     },
//   ],
// });

// let result = await PostTag.findAll({
//   attributes: ["post_id", "tag_name"],
//   where: {
//     tag_name: {
//       [Op.like]: `${searchString}%`,
//     },
//   },
// });
// let result = await Posts.findAll({
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
