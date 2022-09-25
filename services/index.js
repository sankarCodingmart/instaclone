import getFeedContent from "./feed/feedService";
import createPost from "./posts/createPost";
import { signUp, signIn } from "./auth/authService";
import editProfile from "./settings/editProfile";
const service = {};

service.getFeedContent = getFeedContent;
service.createPost = createPost;
service.signIn = signIn;
service.signUp = signUp;
service.editProfile = editProfile;
export { service };
