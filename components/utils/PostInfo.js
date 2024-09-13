import React, { useState, useEffect } from "react";
import { Alert, TouchableHighlight, View, Modal } from "react-native";
import {
	ActivityIndicator,
	Avatar,
	Button,
	Card,
	Paragraph,
	Title,
	IconButton,
	TextInput,
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import MyStyles from "../../styles/MyStyles";
import Hashtag from "../hashtags/Hashtag";
import PostImages from "../posts/PostImages";
import CommentModal from "../comments/CommentModal";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import APIs, { authApi, endpoints } from "../../configs/APIs";

const PostInfo = ({ post, loading }) => {
	const navigation = useNavigation();
	const [averageRating, setAverageRating] = useState(null);
	const [isModalVisible, setModalVisible] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const fetchAverageRating = async (postId) => {
		try {
			const token = await AsyncStorage.getItem("token");

			const response = await authApi(token).get(endpoints.averageRating(postId));


			const data = response.data;
			setAverageRating(data.average_rating);
		} catch (error) {
			Alert.alert(
				"Error",
				`Failed to fetch average rating: ${error.message}`
			);
		}
	};


	useEffect(() => {
		fetchAverageRating(post.id);
	}, [post.id]);

	const renderStars = () => {
		const stars = [];
		if (averageRating !== null) {
			for (let i = 1; i <= 5; i++) {
				stars.push(
					<Icon
						key={i}
						name={
							i <= Math.round(averageRating) ? "star" : "star-o"
						}
						size={20}
						color="#FFD700"
					/>
				);
			}
		}
		return stars;
	};

	const checkLoginStatus = async () => {
		try {
			const token = await AsyncStorage.getItem("token");
			if (token) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		} catch (error) {
			console.log("Token error: ", error);
			setIsLoggedIn(false);
		}
	};

	const handleCommentSubmit = async () => {
		if (!isLoggedIn) {
			Alert.alert(
				"Yêu cầu đăng nhập",
				"Bạn cần đăng nhập để bình luận.",
				[{ text: "OK" }]
			);
		} else {
			try {
				if (!comment.trim()) {
					Alert.alert(
						"Thông báo",
						"Nội dung bình luận không được để trống."
					);
					return;
				}
				const token = await AsyncStorage.getItem("token");
				const response = await APIs.post(
					endpoints["comments"](post.id),
					{
						content: comment,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}
				);
				if (response.status === 200 || response.status === 201) {
					setComment("");
					if (typeof onCommentAdded === "function") {
						onCommentAdded(response.data);
					}
				}
			} catch (er) {
				console.error("Error comment upload! ", er.message);
			}
		}
	};

	const onCommentAdded = (newComment) => {
		setComments((prevComments) => [...prevComments, newComment]);
	};

	useEffect(() => {
		checkLoginStatus();
	}, []);

	return (
		<Card style={[MyStyles.margin, MyStyles.border]}>
			<TouchableHighlight
				activeOpacity={0.5}
				underlayColor="#DDDDDD"
				onPress={() =>
					navigation.navigate("ProfileNavigator", {
						userId: post.user.id,
					})
				}
			>
				<Card.Title
					title={`${post.user.first_name} ${post.user.last_name}`}
					subtitle={`${post.user.followers} người theo dõi`}
					left={(props) => (
						<Avatar.Image
							{...props}
							size={50}
							source={{
								uri: post.user.avatar,
							}}
						/>
					)}
					titleStyle={MyStyles.nameUser}
					subtitleStyle={MyStyles.followersUser}
				/>
			</TouchableHighlight>

			<Card.Content style={{ margin: 0 }}>
				<Title>{post.title}</Title>
				<Paragraph>
					{post.starting_point} đến {post.end_point}
				</Paragraph>
				<View style={MyStyles.row}>
					<View
						style={{ flexDirection: "row", alignItems: "center" }}
					>
						{renderStars()}
						{averageRating !== null && (
							<Paragraph style={{ marginLeft: 5 }}>
								Điểm sao: {averageRating.toFixed(2)}
							</Paragraph>
						)}
					</View>

					<Button
						onPress={() =>
							navigation.navigate("RatingDetail", {
								postId: post.id,
							})
						}
					>
						Đánh giá
					</Button>
				</View>
				{<Hashtag hashtags={post.hashtags_read} />}
			</Card.Content>
			{loading && <ActivityIndicator />}
			{<PostImages images={post.images} />}
			{post.active ? (
				<></>
			) : (
				<Card.Actions>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<TextInput
							style={{
								borderRadius: 10,
								backgroundColor: "#fff",
								flex: 1,
							}}
							placeholder="Nhập bình luận..."
							mode="outlined"
							label="Comment"
							onFocus={toggleModal}
							value={comment}
							onChangeText={setComment}
						/>
						<IconButton
							icon="send"
							size={24}
							onPress={handleCommentSubmit}
							style={MyStyles.sendIcon}
						/>
					</View>
					<Button
						icon={"send-circle"}
						onPress={() =>
							navigation.navigate("PostDetail", {
								postId: post.id,
							})
						}
					>
						Chi tiết
					</Button>
				</Card.Actions>
			)}
			{post.active ? (
				<></>
			) : (
				<CommentModal
					isVisible={isModalVisible}
					postId={post.id}
					onClose={toggleModal}
					onCommentAdded={onCommentAdded}
				/>
			)}
		</Card>
	);
};

export default PostInfo;
