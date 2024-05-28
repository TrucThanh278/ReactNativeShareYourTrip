
import axios from "axios";

const BASE_URL = 'http://192.168.1.48:8000';

export const endpoints = {
    'register': '/users/',
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'user-detail': '/users/',
    'report-user': '/report/',

    hashtags: "/hashtags/",
    posts: "/posts/",
    postsDetails: (postId) => `/posts/${postId}`,
    comments: (postId) => `/posts/${postId}/comments`,
};

export const authApi = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export default axios.create({
    baseURL: BASE_URL
});
