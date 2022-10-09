const userData = [
  {
    user_name: "sankar1",
    name: "sankara",
    email: "sankarannamalai01@gmail.com",
    password: "sk123",
    phone_number: 9784561230,
    location: "Erode",
    deviceName: "Lenova",
  },
  {
    name: "somu",
    userName: "somu123",
    email: "somu@gmail.com",
    password: "somu123",
    phoneNumber: 2365478910,
    location: "Coimbatore",
    deviceName: "Dell",
  },
  {
    name: "Jil",
    userName: "jil_mass",
    email: "jil@gmail.com",
    password: "jil321",
    phoneNumber: 4567891230,
    location: "Chennai",
    deviceName: "Mac book air",
  },
  {
    name: "Karna",
    userName: "KaasiMedu_karna",
    email: "karna@gmail.com",
    password: "karna123",
    phoneNumber: 1234567980,
    location: "Chennai",
    deviceName: "Think Pad",
  },
  {
    name: "john",
    userName: "John_Abraham",
    email: "john@gmail.com",
    password: "john123",
    phoneNumber: 7895461230,
    location: "Tirunelveli",
    deviceName: "HP",
  },
];

const profileData = [
  {
    user_id: 1,
    profile_pic_url:
      "https://images.unsplash.com/photo-1565802527863-1353e4ebce91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW50cm92ZXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    bio: "I'm an introvert",
    website_url: "www.introvertKootam.com",
  },
  {
    user_id: 2,
    profile_pic_url:
      "https://images.unsplash.com/photo-1565802527863-1353e4ebce91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW50cm92ZXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    bio: "Pop singer/Artist",
    website_url: "www.popsingerscommitee.com",
  },
  {
    user_id: 3,
    profile_pic_url:
      "https://images.unsplash.com/photo-1565802527863-1353e4ebce91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW50cm92ZXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    bio: "Billonaire, PlayBoy, Genius",
    website_url: "www.thuglifes.com",
  },
  {
    user_id: 4,
    profile_pic_url:
      "https://images.unsplash.com/photo-1565802527863-1353e4ebce91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW50cm92ZXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    bio: "Part time archeologist, full time drinker",
    website_url: "www.extrovertKootam.com",
  },
];

const followData = [
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
    music_name: "Engaeyo Partha",
    music_thumbnail_url: "",
    genre: "Melody",
    artist_name: "Yuvan",
    music_url: "url",
  },
  // {
  //   music_name: "Mayilirage",
  //   music_thumbnail_url: "",
  //   genre: "classic",
  //   artist_name: "A R rahuman",
  //   music_url: "url",
  // },
  // {
  //   music_name: "Munbae vaa",
  //   music_thumbnail_url: "",
  //   genre: "classic",
  //   artist_name: "A R rahuman",
  //   music_url: "url",
  // },
  // {
  //   music_name: "Oru naalil",
  //   music_thumbnail_url: "",
  //   genre: "classic",
  //   artist_name: "Yuvan",
  //   music_url: "url",
  // },
  // {
  //   music_name: "Aval Ulagaalgiyae",
  //   music_thumbnail_url: "",
  //   genre: "melody",
  //   artist_name: "Karthik",
  //   music_url: "url",
  // },
  // {
  //   music_name: "Despacito",
  //   music_thumbnail_url: "",
  //   genre: "rock",
  //   artist_name: "Luis Fonsi",
  //   music_url: "url",
  // },
];

const storyData = [
  {
    account: { userId: 1 },
    media: {
      mediaUrl:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
      storyType: 0,
    },
    mentions: [{ mentionId: 2 }],
    music: { musicId: 2 },
    storyDetails: { likes: 0, storyUrl: "New post1", reel: "false" },
  },
  {
    account: { userId: 3 },
    media: {
      mediaUrl:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
      storyType: 0,
    },
    mentions: [{ mentionId: 1 }],
    music: { musicId: 1 },
    storyDetails: { likes: 0, storyUrl: "New post2", reel: "false" },
  },
  {
    account: { userId: 2 },
    media: {
      mediaUrl:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
      storyType: 0,
    },
    mentions: [{ mentionId: 3 }],
    music: { musicId: 1 },
    storyDetails: { likes: 0, storyUrl: "New post3", reel: "false" },
  },
];

export default async function seedData(db) {
  const {
    account,
    follow,
    user,
    stories,
    storyMedia,
    artist,
    storyMention,
    musicStatic,
    posts,
  } = db;

  // Seed Music Data
  // musicData.forEach(async (m) => {
  //   const d = await musicStatic.create(m);
  //   const artistData = {};
  //   artistData.music_id = d.dataValues.music_id;
  //   artistData.artist_name = m.artist_name;
  //   await artist.create(artistData);
  // });

  //Seed User Data
  // userData.forEach(async (d) => {
  //   await account.create(d);
  // });

  //Seed follow Data
  // followData.forEach(async (d) => {
  //   await follow.create(d);
  // });

  //Seed Story Data
  // storyData.forEach(async (d) => {
  //   await stories.create(d);
  // });

  //Seed Post Data
  // postData.forEach(async (d)=>{
  //  await post.create(d);
  // })
}
