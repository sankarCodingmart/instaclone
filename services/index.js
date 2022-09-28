import getFeedContent from "./feed/feedService";
import createPost from "./posts/createPost";
import deletePost from "./posts/deletePost";
import { signUp, signIn } from "./auth/authService";
import editProfile from "./settings/editProfile";
import getProfilePage from "./feed/profilePage";
import deleteStory from "./stories/deleteStory";
import viewStory from "./stories/viewStory";
import createStory from "./stories/createStory";
import acceptRequest from "./follow/acceptRequest";
import addFollower from "./follow/addFollower";
import unfollow from "./follow/unfollow";
import createHighlight from "./stories/createHighlight";
import viewHighlight from "./stories/viewHighlight";
import getFollowers from "./follow/getFollowers";
import getFollowing from "./follow/getFollowing";
import getTaggedPosts from "./posts/getTaggedPosts";
import createComment from "./posts/createComment";
import updateLikes from "./posts/updateLikes";
import makeRequest from "./follow/makeRequest";
import makeCloseFriends from "./follow/makeCloseFriends";
import removeCloseFriends from "./follow/removeCloseFriends";
import getExploreContent from "./feed/explore";
import viewPosts from "./feed/viewPosts";
import savePost from "./posts/savePost";
import createMessage from "./Message/createMessage";
import deleteMessage from "./Message/deleteMessage";
import changeAccountType from "./settings/changePrivate";
import getActivities from "./feed/getActivity";
import changeAccountPrivacy from "./settings/changeAccountPrivacy";
import archivePost from "./posts/archivePost";
import getSavedPostGroups from "./posts/getSavedPostGroups";
import getSavedPosts from "./posts/getSavedPosts";

const service = {};

service.getFeedContent = getFeedContent;
service.createPost = createPost;
service.signIn = signIn;
service.signUp = signUp;
service.editProfile = editProfile;
service.getProfilePage = getProfilePage;
service.deleteStory = deleteStory;
service.viewStory = viewStory;
service.createStory = createStory;
service.deletePost = deletePost;
service.addFollower = addFollower;
service.unfollow = unfollow;
service.acceptRequest = acceptRequest;
service.createHighlight = createHighlight;
service.viewHighlight = viewHighlight;
service.getFollowers = getFollowers;
service.getFollowing = getFollowing;
service.getTaggedPosts = getTaggedPosts;
service.createComment = createComment;
service.updateLikes = updateLikes;
service.makeRequest = makeRequest;
service.makeCloseFriends = makeCloseFriends;
service.removeCloseFriends = removeCloseFriends;
service.getExploreContent = getExploreContent;
service.viewPosts = viewPosts;
service.savePosts = savePost;
service.createMessage = createMessage;
service.deleteMessage = deleteMessage;
service.changeAccountType = changeAccountType;
service.getActivities = getActivities;
service.changeAccountPrivacy = changeAccountPrivacy;
service.archivePost = archivePost;
service.getSavedPostGroups = getSavedPostGroups;
service.getSavedPosts = getSavedPosts;

export { service };
