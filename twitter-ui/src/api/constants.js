export const END_POINT_URI = `${window.location.protocol}//${window.location.hostname}:4001`;

export const BASE_URL = `${END_POINT_URI}/api`;
export const API_ROUTE_LOGIN = `${BASE_URL}/login`;

export const API_ROUTE_VALIDATE_EMAIL = `${BASE_URL}/email`;
export const API_ROUTE_SIGNUP = `${BASE_URL}/signup`;
export const API_ROUTE_TWEETS = `${BASE_URL}/tweets`;
export const API_ROUTE_POST_TWEET = `${BASE_URL}/me/tweets`;
export const API_ROUTE_POST_LIKE = `${BASE_URL}/like`;
export const API_ROUTE_POST_LIKES_COUNTS = `${BASE_URL}/likes-count`;
export const API_ROUTE_LIKES = `${BASE_URL}/likes`;
export const API_ROUTE_MY_FOLLOWERS = `${BASE_URL}/me/follower`;
export const API_ROUTE_MY_FOLLOWINGS = `${BASE_URL}/me/following`;
export const API_ROUTE_POST_FOLLOW = `${BASE_URL}/me/follow`;
export const API_ROUTE_FOLLOW = `${BASE_URL}/follow`;
export const API_ROUTE_USERS = `${BASE_URL}/users`;
export const API_ROUTE_USER_TWEETS = `${BASE_URL}/me/tweets`;
export const API_ROUTE_USER_PROFILE = `${BASE_URL}/user`;

export const NETWORK_ERROR = `Network Error`;