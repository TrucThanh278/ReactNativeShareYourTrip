import axios from "axios";

const BASE_URL = "http://192.168.100.243:8000";


export const endpoints = {
	register: "/users/",
	login: "/o/token/",
	"current-user": "/users/current-user/",
	"user-detail": "/users/",
	"report-user": "/report/",
	"follow-user": "/follow/",
	"rating-post": "/rating/",
	averageRating: (postId) => `/posts/${postId}/average_rating/`,
	reports: "/report/",
	users: "/users/",
	blockUser: (userId) => `/users/${userId}/block_user/`,
	deleteUser: "/api/logout",
	postImages: (postId) => `/posts/${postId}/images`,
	images: "/images/",
	hashtags: "/hashtags/",
	posts: "/posts/",
	postsDetails: (postId) => `/posts/${postId}`,
	comments: (postId) => `/posts/${postId}/comments/`,
	userinfo: (userID) => `/users/${userID}`,
};

export const authApi = (token) => {
	return axios.create({
		baseURL: BASE_URL,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export default axios.create({
	baseURL: BASE_URL,
});
