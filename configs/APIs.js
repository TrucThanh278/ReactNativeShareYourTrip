import axios from "axios";

const BASE_URL = "http://192.168.1.181:8000/";

export const endpoints = {
	hashtags: "/hashtags/",
	posts: "/posts/",
	postsDetails: (postId) => `/posts/${postId}`,
	comments: (postId) => `/posts/${postId}/comments`,
};

export default axios.create({
	baseURL: BASE_URL,
});
