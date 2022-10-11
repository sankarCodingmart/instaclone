import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import post from "./models/posts/post";
export default async function populateData(db) {
  const Account = db.account;
  const NotificationSettings = db.notificationSettings;
  const User = db.user;
  const Post = db.post;
  const Music = db.music;
  const MusicStatic = db.musicStatic;
  const Media = db.media;
  const PostTag = db.postTag;
  // let musicUrl = [
  //   "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
  //   "https://www.kozco.com/tech/piano2-CoolEdit.mp3",
  //   "https://www.kozco.com/tech/organfinale.mp3",
  // ];
  // for (let i = 0; i < 300; i++) {
  //   await MusicStatic.create({
  //     music_name: faker.music.songName(),
  //     genre: faker.music.genre(),
  //     music_thumbnail_url: faker.image.image(),
  //     music_url: musicUrl[Math.floor(Math.random() * musicUrl.length)],
  //   });
  // }
  // let tags = [];
  // for (let i = 0; i < 30; i++) {
  //   tags.push(faker.random.word());
  // }
  // for (let i = 21; i < 1001; i++) {
  //   const name = faker.name.fullName();
  //   const phone_number = faker.phone.number("9#########");
  //   const user_name = name.toLowerCase().replace(" ", "_");
  //   const password = name.toLowerCase().replace(" ", "").slice(0, 8);
  //   const email = faker.internet.email(name.split(" ")[0], name.split(" ")[1]);
  //   const account = await Account.create({
  //     user_name: user_name,
  //     password: bcrypt.hashSync(password, 8),
  //     name: name,
  //     phone_number: phone_number,
  //     email: email,
  //   });
  //   await NotificationSettings.create({
  //     user_id: account.dataValues.id,
  //     like: faker.datatype.number(2),
  //     photo: faker.datatype.number(2),
  //     comments: faker.datatype.number(2),
  //     comment_like: faker.datatype.number(2),
  //     first: faker.datatype.number(2),
  //     follower_req: faker.datatype.boolean(),
  //     accept_req: faker.datatype.boolean(),
  //     account_suggestion: faker.datatype.boolean(),
  //     message_req: faker.datatype.boolean(),
  //     message: faker.datatype.boolean(),
  //     message_reminder: faker.datatype.boolean(),
  //     unrecognized: faker.datatype.boolean(),
  //     reminder: faker.datatype.boolean(),
  //     recent_reel: faker.datatype.boolean(),
  //     most_watched_reel: faker.datatype.boolean(),
  //   });
  //   await User.create({
  //     user_id: account.dataValues.id,
  //     bio: faker.random.words(8),
  //     profile_pic_url: faker.image.people(),
  //     private_account: faker.datatype.boolean(),
  //     websiteUrl: faker.internet.url(),
  //   });
  // }
  // for (let i = 1; i < 1001; i++) {
  //   for(let j=1;j<10;j++){
  // const post = await Post.create({
  //     user_id: faker.datatype.number(1000),
  //     likes: 0,
  //     caption: faker.random.words(5),
  //     location: faker.address.cityName(),
  //     reel: false,
  //     music_id: faker.datatype.number(6),
  //     is_archived: false,
  //   });
  //   const post_id = post.dataValues.post_id;
  //   await Media.create({
  //     post_id: post_id,
  //     media_url: faker.image.imageUrl(),
  //     post_type: 0,
  //   });
  //   for (let i = 0; i < 8; i++) {
  //     await PostTag.create({
  //       post_id: post_id,
  //       tag_name: tags[faker.datatype.number(500)],
  //     });
  //   }
  //   await Music.create({
  //     post_id: post_id,
  //     music_id: post.dataValues.music_id,
  //   });
  //   for (let i = 0; i < 4; i++) {
  //     let id = faker.datatype.number(300);
  //     const mentionAcc = await Account.findByPk(id);

  //     await PostActivity.create({
  //       user_id: account.dataValues.id,
  //       target_id: id,
  //       post_id: post_id,
  //       type: 1,
  //     });
  //     await Mention.create({
  //       user_id: account.dataValues.id,
  //       post_id: post_id,
  //       mention_id: mentionAcc.id,
  //       user_name: mentionAcc.dataValues.user_name,
  //     });
  //   }
  // }
  // }
}
