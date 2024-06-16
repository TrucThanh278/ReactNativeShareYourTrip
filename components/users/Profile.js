import React, { useEffect, useState, useContext } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { MyDispatchContext, MyUserContext } from "../../configs/Context";
import MyStyles from "../../styles/MyStyles";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi, endpoints } from '../../configs/APIs'; // Import API configurations
import Logout from "./Logout";

const Profile = ({ navigation }) => {
    const dispatch = useContext(MyDispatchContext);
    const user = useContext(MyUserContext);
    const [avatar, setAvatar] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [postCount, setPostCount] = useState(0); // State to store the count of user's posts

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    // Lấy thông tin người dùng hiện tại
                    const response = await authApi(token).get(endpoints['current-user']);
                    setAvatar(response.data.avatar);

                    // Lấy danh sách bài đăng của người dùng hiện tại
                    const userId = response.data.id;
                    const userPostsResponse = await authApi(token).get(endpoints['posts'], { params: { user: userId } });

                    // Kiểm tra dữ liệu trả về có phù hợp không
                    if (Array.isArray(userPostsResponse.data.results)) {
                        // Xử lý từng bài đăng để lấy hình ảnh và hiển thị
                        const postsWithImages = await Promise.all(
                            userPostsResponse.data.results.map(async (post) => {
                                // Lấy hình ảnh của bài đăng từ endpoint images
                                const postImageUrl = `http://192.168.1.47:8000/posts/${post.id}/images`;
                                const postImageResponse = await authApi(token).get(postImageUrl);
                                return {
                                    ...post,
                                    images: postImageResponse.data.map(image => image.image),
                                };
                            })
                        );

                        // Lọc chỉ những bài đăng của người dùng hiện tại
                        const filteredPosts = postsWithImages.filter(post => post.user.id === userId);

                        // Cập nhật state với danh sách bài đăng đã có hình ảnh
                        setPosts(filteredPosts);
                        setPostCount(filteredPosts.length); // Cập nhật số lượng bài đăng

                        setLoading(false);
                    } else {
                        console.error("User posts data structure is invalid:", userPostsResponse.data);
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const pickAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setAvatar(result.uri);
            // Here you can add logic to update the avatar on the server as well
        }
    };

    if (!user || loading) {
        return <Text>Loading...</Text>; // Render loading indicator until user and posts are fetched
    }

    return (
        <ScrollView style={[MyStyles.container, MyStyles.margin]}>
            <View>
                {/* Cover photo and Avatar section */}
                <View>
                    {/* Cover photo (implement your logic here) */}
                    <Image source={require('./assets/images/default_cover.jpg')} style={styles.coverPhoto} />

                    {/* Avatar section */}
                    <View style={[styles.position, styles.margin_avatar]}>
                        <TouchableOpacity onPress={pickAvatar}>
                            <Image source={avatar ? { uri: avatar } : require('./assets/images/default_avatar.jpg')} style={styles.avatar} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* User information section */}
                <View style={{ marginTop: 25 }}>
                    <Text style={[styles.subject, styles.margin_left]}> {user.first_name} {user.last_name}</Text>
                    <View style={[MyStyles.row]}>
                        <Text style={[styles.text, MyStyles.margin]}>Theo dõi: {user.followers}</Text>
                        <Text style={[styles.text, MyStyles.margin]}>Đang theo dõi: {user.following}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <Text style={[styles.text]}>Báo cáo: {user.reported_user} </Text>
                    </View>
                    <Text style={styles.text}>Email: {user.email}</Text>
                    <Text style={styles.text}>Số điện thoại: {user.phone_number}</Text>

                    {/* Button to navigate to update profile screen */}
                    <Button icon="pencil"
                        style={[styles.button]}
                        buttonColor="rgb(79, 133, 13)"
                        mode="contained" onPress={() => navigation.navigate('UpdateProfile')} >
                        Cập nhật hồ sơ
                    </Button>

                    {/* Logout button component */}
                    <Logout navigation={navigation} />


                </View>

                {/* Personal collection section */}
                <View style={styles.collections}>
                    <Text style={styles.sectionTitle}>Bộ sưu tập cá nhân</Text>
                    <ScrollView horizontal style={{ height: 150 }}>
                        {posts && posts.length > 0 ? (
                            posts.map((post, index) => (
                                post.images.map((image, imgIndex) => (
                                    <View key={`${index}-${imgIndex}`} style={styles.postContainer}>
                                        <Image source={{ uri: image }} style={styles.postImage} />
                                        <View style={styles.overlay}>
                                            <Text style={styles.overlayText}>{post.title}</Text>
                                        </View>
                                    </View>
                                ))
                            ))
                        ) : (
                            <Text>No posts found</Text>
                        )}
                    </ScrollView>

                    <Text style={styles.sectionTitle}>Chuyến đi</Text>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Đã lên kế hoạch</Text>
                        {/* Display number of posts */}
                        <Text style={styles.statValue}>{postCount}</Text>
                    </View>
                </View>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    subject: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    coverPhoto: {
        width: "100%",
        height: 200,
        marginBottom: 10,
    },
    text: {
        marginBottom: 5,
        marginLeft: 10
    },
    button: {
        marginBottom: 5,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    position: {
        position: "absolute",
        top: 100,
        left: 10,
    },
    margin_avatar: {
        marginTop: 30,
        alignItems: 'center',
    },
    margin_right: {
        marginRight: 15
    },
    collections: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20
    },
    postContainer: {
        height: "100%",
        position: "relative",
        width: 250,
        margin: 5,
    },
    postImage: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    overlayText: {
        color: "#fff",
        fontSize: 16,
    },
    stats: {
        padding: 20,
    },
    statItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    statLabel: {
        fontSize: 18,
    },
    statValue: {
        fontSize: 18,
        color: "#888",
    },
    margin_left: {
        marginLeft: 20
    }
});

export default Profile;


