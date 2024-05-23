import axios from "axios";

const BASE_URL = "http://192.168.1.124:8000/";

export const endpoints = {
	posts: "/posts/",
	hashtags: "/hashtags/",
};

export default axios.create({
	baseURL: BASE_URL,
});
