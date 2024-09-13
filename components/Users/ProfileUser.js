import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert } from "react-native";
import { Button } from 'react-native-paper';
import MyStyles from '../../styles/MyStyles';
import { authApi, endpoints } from '../../configs/APIs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReportUserPage from './ReportUserPage';

const ProfileUser = ({ route }) => {
	const [user, setUser] = useState(null);
	const [avatar, setAvatar] = useState(null);
	const [coverPhoto, setCoverPhoto] = useState(null);
	const [showReportModal, setShowReportModal] = useState(false);
	const [token, setToken] = useState(null);
	const [currentUserId, setCurrentUserId] = useState(null);
	const [isFollowing, setIsFollowing] = useState(false);
	const [posts, setPosts] = useState([]);
	const [loadingPosts, setLoadingPosts] = useState(true);
	const [postCount, setPostCount] = useState(0);
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const { userId } = route.params;
				const response = await authApi().get(`${endpoints['user-detail']}${userId}`);
				setUser(response.data);

				setAvatar(response.data.avatar);
				setCoverPhoto(response.data.coverPhoto);


				const token = await AsyncStorage.getItem('token');
				if (token) {
					const api = authApi(token);
					const currentUserResponse = await api.get(endpoints['current-user']);
					setCurrentUserId(currentUserResponse.data.id);

					const followStatusResponse = await api.get(endpoints['follow-user'], {
						params: {
							follower_id: currentUserResponse.data.id,
							following_id: userId
						}
					});
					setIsFollowing(followStatusResponse.data.is_following);
				}


				const userPostsResponse = await authApi().get(endpoints['posts'], { params: { user: userId } });
				if (Array.isArray(userPostsResponse.data.results)) {
					const postsWithImages = await Promise.all(
						userPostsResponse.data.results.map(async (post) => {
							const postImageUrl = endpoints.postImages(post.id);
							const postImageResponse = await authApi().get(postImageUrl);
							return {
								...post,
								images: postImageResponse.data.map(image => image.image),
							};
						})
					);

					const filteredPosts = postsWithImages.filter(post => post.user.id === userId);

					setPosts(filteredPosts);
					setPostCount(filteredPosts.length);
					setLoadingPosts(false);
				} else {
					console.error("User posts data structure is invalid:", userPostsResponse.data);
					setLoadingPosts(false);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchUserData();

		AsyncStorage.getItem('token').then(token => {
			setToken(token);
			if (token) {
				authApi(token).get(endpoints['current-user']).then(response => {
					setCurrentUserId(response.data.id);
				}).catch(error => {
					console.error('Error retrieving current user ID:', error);
				});
			}
		}).catch(error => {
			console.error('Error retrieving token from AsyncStorage:', error);
		});
	}, [route.params]);

	const handleReport = () => {
		setShowReportModal(true);
	};

	const handleFollow = async () => {
		try {
			if (!token) {
				console.error('Token not found in AsyncStorage');
				return;
			}

			if (currentUserId === user.id) {
				Alert.alert('Lỗi', 'Bạn không thể follow chính mình');
				return;
			}

			const api = authApi(token);
			if (isFollowing) {
				await api.delete(endpoints['follow-user'], {
					data: {
						follower_id: currentUserId,
						following_id: user.id
					}
				});
				setIsFollowing(false);
				console.log('Unfollowed successfully');
			} else {
				const response = await api.post(endpoints['follow-user'], {
					follower_id: currentUserId,
					following_id: user.id
				});
				setIsFollowing(true);
				console.log('Follow thành công:', response.data);
			}
		} catch (error) {
			if (error.response && error.response.data && error.response.data.error) {
				console.error('Follow thất bại:', error.response.data.error);
				Alert.alert('Follow thất bại', error.response.data.error);
			} else {
				console.error('Follow thất bại:', error);
				Alert.alert('Follow thất bại', 'An error occurred. Please try again later.');
			}
		}
	};

	if (!user || loadingPosts) {
		return <Text>Loading...</Text>;
	}

	return (
		<ScrollView style={[MyStyles.container, MyStyles.margin]}>
			<View>
				<TouchableOpacity>
					<Image source={coverPhoto ? { uri: coverPhoto } : require("./assets/images/default_cover.jpg")} style={styles.coverPhoto} />
				</TouchableOpacity>
				<View style={[styles.position, styles.margin_avatar]}>
					<TouchableOpacity>
						{avatar ? (
							<Image source={{ uri: avatar }} style={styles.avatar} />
						) : (
							<Image source={require('./assets/images/default_avatar.jpg')} style={styles.avatar} />
						)}
					</TouchableOpacity>
				</View>
				<View style={{ marginTop: 25 }}>
					<View style={[MyStyles.row]}>
						<Text style={[styles.subject, styles.margin_left]}> {user.first_name} {user.last_name}</Text>
						<Button
							icon={isFollowing ? "account-check-outline" : "account-plus-outline"}
							onPress={handleFollow}
						>
							{isFollowing ? "Đang theo dõi" : "Theo dõi"}
						</Button>
					</View>
					<View style={[MyStyles.row]}>
						<Text style={[styles.text, MyStyles.margin]}>Theo dõi: {user.followers}</Text>
						<Text style={[styles.text, MyStyles.margin]}>Đang theo dõi: {user.following}</Text>
					</View>
					<View style={styles.ratingContainer}>
						<Text style={[styles.text]}>Báo cáo: {user.reported_user} </Text>
					</View>
					<Text style={styles.text}>Email: {user.email}</Text>
					<Text style={styles.text}>Số điện thoại: {user.phone_number}</Text>
					<Button icon="message" buttonColor="rgb(79, 133, 13)" mode="contained">Nhắn tin</Button>

					<Button icon="alert-circle" title="Report" onPress={handleReport}>Báo cáo</Button>

					<Modal
						visible={showReportModal}
						animationType="slide"
						onRequestClose={() => setShowReportModal(false)}
					>
						<ReportUserPage userId={user.id} token={token} />
					</Modal>
				</View>

				<View style={styles.collections}>
					<Text style={styles.sectionTitle}>Bộ sưu tập cá nhân</Text>
					<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 150 }}>
						{posts.map((post, index) => (
							<TouchableOpacity key={index} style={styles.postContainer}>
								<Image source={{ uri: post.images[0] }} style={styles.postImage} />
								<View style={styles.postOverlay}>
									<Text Text style={styles.postTitle}>{post.title}</Text>
								</View>
							</TouchableOpacity>
						))}
					</ScrollView>

					<Text style={styles.sectionTitle}>Chuyến đi</Text>
					<View style={styles.statItem}>
						<Text style={[styles.statLabel]}>Đã lên kế hoạch</Text>
						<Text style={styles.statValue}>{postCount}</Text>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

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
		marginLeft: 10,
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
	collections: {
		padding: 20,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 20
	},
	postContainer: {
		height: 150,
		width: 250,
		marginHorizontal: 5,
	},
	postImage: {
		width: "100%",
		height: "100%",
		borderRadius: 10,
	},
	postOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	},
	postTitle: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	deleteButton: {
		position: 'absolute',
		bottom: 10,
		right: 10,
		backgroundColor: 'red',
		padding: 5,
		borderRadius: 5,
	},
	deleteText: {
		color: 'white',
		fontWeight: 'bold',
	},
});

export default ProfileUser;


