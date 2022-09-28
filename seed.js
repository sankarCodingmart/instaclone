const Userdata = [
  {
    userName: "sankar1",
    name: "sankara",
    email: "sankarannamalai01@gmail.com",
    password: "sk123",
  },
  {
    name: "somu",
    userName: "somu123",
    email: "somu@gmail.com",
    password: "somu123",
  },
  {
    name: "Jil",
    userName: "jil_mass",
    email: "jil@gmail.com",
    password: "jil321",
  },
  {
    name: "Karna",
    userName: "KaasiMedu_karna",
    email: "karna@gmail.com",
    password: "karna123",
  },
  {
    name: "john",
    userName: "John_Abraham",
    email: "john@gmail.com",
    password: "john123",
  },
];

const FollowData = [
  {
    follower_id: 1,
    followee_id: 2,
  },
  {
    follower_id: 1,
    followee_id: 3,
  },
  {
    follower_id: 2,
    followee_id: 3,
  },
  {
    follower_id: 3,
    followee_id: 2,
  },
  {
    follower_id: 4,
    followee_id: 5,
  },
  {
    follower_id: 5,
    followee_id: 1,
  },
];

const musicData = [
  {
    music_name: "Mayilirage",
    music_thumbnail_url: "",
    genre: "classic",
    artist_name: "A R rahuman",
    music_url: "url",
  },
  {
    music_name: "Munbae vaa",
    music_thumbnail_url: "",
    genre: "classic",
    artist_name: "A R rahuman",
    music_url: "url",
  },
  {
    music_name: "Oru naalil",
    music_thumbnail_url: "",
    genre: "classic",
    artist_name: "Yuvan",
    music_url: "url",
  },
  {
    music_name: "Aval Ulagaalgiyae",
    music_thumbnail_url: "",
    genre: "melody",
    artist_name: "Karthik",
    music_url: "url",
  },
  {
    music_name: "Despacito",
    music_thumbnail_url: "",
    genre: "rock",
    artist_name: "Luis Fonsi",
    music_url: "url",
  },
];

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
}
