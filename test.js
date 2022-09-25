import { HasMany, Op, QueryTypes, Sequelize } from "sequelize";
const data = [
  { name: "sankara" },
  { name: "somu" },
  { name: "akash" },
  { name: "sriram" },
  { name: "richard" },
];

let followdata = [];

for (let i = 2; i < 6; i++) {
  followdata.push({
    follower_id: 1,
    followee_id: i,
  });
}
// console.log(data);

const storydata = [
  {
    user_id: 2,
    story_url:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2FRandom-Images-947623412052831%2F&psig=AOvVaw2tCXfaP74j1ZhmUL8Qb15_&ust=1664025404015000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIiKguv_qvoCFQAAAAAdAAAAABAD",
    likes: 0,
  },
  {
    user_id: 3,
    story_url:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2FRandomimges27%2F&psig=AOvVaw2tCXfaP74j1ZhmUL8Qb15_&ust=1664025404015000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIiKguv_qvoCFQAAAAAdAAAAABAH",
    likes: 0,
  },
];
const musicData = [
  {
    music_name: "Mayilirage",
    music_thumbnail_url: "",
    genre: "classic",
    artist_name: "A R rahuman",
  },
  {
    music_name: "Munbae vaa",
    music_thumbnail_url: "",
    genre: "classic",
    artist_name: "A R rahuman",
  },
  {
    music_name: "Oru naalil",
    music_thumbnail_url: "",
    genre: "classic",
    artist_name: "Yuvan",
  },
  {
    music_name: "Aval Ulagaalgiyae",
    music_thumbnail_url: "",
    genre: "melody",
    artist_name: "Karthik",
  },
  {
    music_name: "Despacito",
    music_thumbnail_url: "",
    genre: "rock",
    artist_name: "Luis Fonsi",
  },
];
// for
// Account.create

export default async function createRecords(db) {
  const {
    account,
    follow,
    user,
    stories,
    sequelize,
    storyMedia,
    artist,
    storyMention,
    musicStatic,
  } = db;
  //   (async () => {
  //     await sequelize.sync({ force: true });
  //     console.log("Drop and Resync DB");
  //   })();

  //   const Movie = await sequelize.define("Movie", { name: Sequelize.STRING });
  //   const Actor = await sequelize.define("Actor", { name: Sequelize.STRING });
  //   Movie.hasOne(Actor);
  //   Actor.belongsTo(Movie);
  //   await Movie.create({ name: "inception" });
  //   await Actor.create({ name: "leo" });
  //   const userResult = await user.create({
  //     user_id: 1,
  //     private_account: false,
  //   });
  //   const result = await stories.findOne({
  //     include: {
  //       model: storyMedia,
  //     },
  //   });
  //   const result2 = await storyMedia.findOne({
  //     include: stories,
  //   });
  //   console.log(JSON.stringify(result));
  //   console.log(JSON.stringify(result2));
  //   musicData.forEach(async (m) => {
  //     const d = await musicStatic.create(m);
  //     const artistData = {};
  //     artistData.music_id = d.dataValues.music_id;
  //     artistData.artist_name = m.artist_name;
  //     await artist.create(artistData);
  //   });
  //   data.forEach(async (d) => {
  //     await account.create(d);
  //   });
  //   storydata.forEach(async (d) => {
  //     await stories.create(d);
  //   });
  //   followdata.forEach(async (d) => {
  //     await follow.create(d);
  //   });
  //   const res = await stories.findAll();
  //   res.forEach((res) => {
  //     console.log("user_id: " + res.user_id + ", story_url: " + res.story_url);
  //   });
  //   let followerStories = await follow.findAll({
  //     where: {
  //       follower_id: 1,
  //     },
  //     include: [
  //       {
  //         model: account,
  //         required: true,
  //         include: {
  //           model: stories,
  //           where: {
  //             user_id: {
  //               [Op.ne]: 1,
  //             },
  //           },
  //           required: true,
  //         },
  //       },
  //     ],
  //   });
  //   console.log(JSON.stringify(followerStories, null, 2));
  //   let user = {};
  //   user.id = 1;
  //   let followersAccount = await stories.findAll({
  //     include: [
  //       {
  //         model: account,
  //         where: {
  //           id: sequelize.col("user_id"),
  //         },
  //         include: {
  //           model: follow,
  //           where: {
  //             follower_id: user.id,
  //           },
  //           required: true,
  //         },
  //         // required: true,
  //       },
  //     ],
  //   //   });
  //   followersAccount = JSON.parse(JSON.stringify(followersAccount));
  //   console.log(followersAccount);
  //   const followerStories = [];
  //   followersAccount.forEach(async (acc) => {
  //     // console.log(acc.Follow.followee_id);
  //     const story = await stories.findAll({
  //       where: {
  //         user_id: acc.Follow.followee_id,
  //       },
  //     });
  //     followerStories.push(JSON.stringify(story));
  //   });
  //   const result = await stories.findAll({
  //     include: {
  //       model: account,
  //       where: {
  //         id: {
  //           [Op.in]: sequelize.literal(
  //             "SELECT 'Follows'.followee_id FROM 'Follows' WHERE 'Follows'.follower_id=" +
  //               user.id
  //           ),
  //         },
  //       },
  //     },
  //   });
  //   const result = await sequelize.query(
  //     `select * from "Stories" where user_id=(select followee_id from "Follows" where follower_id=` +
  //       user.id +
  //       `)`,
  //     {
  //       type: QueryTypes.SELECT,
  //     }
  //   );
  // const result = await sequelize.query(
  //     `select "Stories".stories_url from (("Stories" inner join "Accounts" on "Accounts".id="Stories".user_id")inner join "User" on "User.user_id"="Account")` +
  //       user.id +
  //       `)`,
  //     {
  //       type: QueryTypes.SELECT,
  //     }
  //   );
  //   const result2 = await sequelize.query(
  //     "select * from stories where user_id=?",
  //     {
  //       replacements: [],
  //       type: QueryTypes.SELECT,
  //     }
  //   );
  //   console.log(JSON.stringify(result, null, 2));
  //   console.log(await followerStories);
}
