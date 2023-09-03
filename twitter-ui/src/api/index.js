import {
  API_ROUTE_FOLLOW,
  API_ROUTE_LIKES,
  API_ROUTE_LOGIN, API_ROUTE_MY_FOLLOWERS, API_ROUTE_MY_FOLLOWINGS, API_ROUTE_POST_FOLLOW, API_ROUTE_POST_LIKE, API_ROUTE_POST_LIKES_COUNTS, API_ROUTE_POST_TWEET, API_ROUTE_SIGNUP, API_ROUTE_TWEETS, API_ROUTE_USERS, API_ROUTE_USER_PROFILE, API_ROUTE_USER_TWEETS, API_ROUTE_VALIDATE_EMAIL,
} from "./constants";

import { post, get } from "./utils";

export const loginUserApi = (username, password) => {
  return get(API_ROUTE_LOGIN, {}, { username, password });
};

export const verifyEmailApi = ({ email }) => {
  return get(`${API_ROUTE_VALIDATE_EMAIL}/${email}`, {}, {});
};

export const signupApi = ({ name, email, username, password, dob }) => {
  return post(API_ROUTE_SIGNUP, { name, email, username, password, dob }, {});
};
export const postLikeApi = ({ postId, userId }) => {
  return post(API_ROUTE_POST_LIKE, { postId, userId }, {});
};


export const getTweetsApi = ({ id }) => {
  return get(API_ROUTE_TWEETS, {}, { id });
};

export const getTweetLikesCountApi = () => {
  return get(API_ROUTE_POST_LIKES_COUNTS, {}, {});
};

export const getTweetLikesApi = () => {
  return get(API_ROUTE_LIKES, {}, {});
};

export const postTweetApi = ({ description, userId }) => {
  return post(API_ROUTE_POST_TWEET, { description, userId }, {});
};

export const getFollowingApi = ({ userId }) => {
  return get(API_ROUTE_MY_FOLLOWINGS, {}, { userId });
};

export const getFollowerApi = ({ userId }) => {
  return get(API_ROUTE_MY_FOLLOWERS, {}, { userId });
};

export const getFollowApi = () => {
  return get(API_ROUTE_FOLLOW, {}, {});
};


export const getUsersApi = () => {
  return get(API_ROUTE_USERS, {}, {});
};

export const postFollowApi = ({ followerId, followingId }) => {
  return post(API_ROUTE_POST_FOLLOW, { followingId, followerId }, {});
};


export const getUserByIdApi = ({ id }) => {
  return get(API_ROUTE_USER_PROFILE, {}, { id });
};

export const getUserTweetsApi = ({ uid }) => {
  return get(API_ROUTE_USER_TWEETS, {}, { uid });
};
