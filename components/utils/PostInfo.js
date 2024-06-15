// import React, { useState, useEffect } from "react";
// import { Alert, TouchableHighlight, View, Modal } from "react-native";
// import {
// 	ActivityIndicator,
// 	Avatar,
// 	Button,
// 	Card,
// 	Paragraph,
// 	Title,
// 	IconButton,
// 	TextInput,
// } from "react-native-paper";
// import Icon from "react-native-vector-icons/FontAwesome"; // Import icon set
// import MyStyles from "../../styles/MyStyles";
// import Hashtag from "../hashtags/Hashtag";
// import PostImages from "../posts/PostImages";
// import CommentModal from "../comments/CommentModal";
// import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import APIs, { endpoints } from "../../configs/APIs";

// //const PostInfo = ({ post, loading, navigation }) => {
// const PostInfo = ({ post, loading }) => {
// 	const navigation = useNavigation();
// 	const [averageRating, setAverageRating] = useState(null);
// 	const [isModalVisible, setModalVisible] = useState(false);
// 	const [isLoggedIn, setIsLoggedIn] = useState(false);
// 	const [comment, setComment] = useState("");
// 	const toggleModal = () => {
// 		setModalVisible(!isModalVisible);
// 	};

// 	const checkLoginStatus = async () => {
// 		try {
// 			const token = await AsyncStorage.getItem("token");
// 			console.log(`Access token...: ${token}`);
// 			if (token) {
// 				setIsLoggedIn(true);
// 			} else {
// 				setIsLoggedIn(false);
// 			}
// 		} catch (error) {
// 			console.log("Token error: ", error);
// 			setIsLoggedIn(false);
// 		}
// 	};

// 	const handleCommentSubmit = async () => {
// 		if (!isLoggedIn) {
// 			Alert.alert(
// 				"Yêu cầu đăng nhập",
// 				"Bạn cần đăng nhập để bình luận.",
// 				[{ text: "OK" }]
// 			);
// 		} else {
// 			try {
// 				const token = await AsyncStorage.getItem("token");
// 				const response = await APIs.post(
// 					endpoints["comments"](post.id),
// 					{
// 						content: comment,
// 					},
// 					{
// 						headers: {
// 							Authorization: `Bearer ${token}`,
// 							"Content-Type": "application/json",
// 						},
// 					}
// 				);
// 				console.log(response.status);
// 				if (response.status === 200 || response.status === 201) {
// 					setComment("");
// 				}
// 			} catch (er) {
// 				console.error("Error comment upload! ", er.message);
// 			}
// 		}
// 	};

// 	// const fetchAverageRating = async (postId) => {
// 	// 	try {
// 	// 		const response = await fetch(
// 	// 			`http://192.168.1.7/posts/${postId}/average_rating/`
// 	// 		);
// 	// 		if (!response.ok) {
// 	// 			throw new Error("Network response was not ok");
// 	// 		}
// 	// 		const data = await response.json();
// 	// 		setAverageRating(data.average_rating);
// 	// 	} catch (error) {
// 	// 		console.error("Error fetching average rating:", error);
// 	// 		Alert.alert(
// 	// 			"Error",
// 	// 			`Failed to fetch average rating: ${error.message}`
// 	// 		);
// 	// 	}
// 	// };

// 	useEffect(() => {
// 		checkLoginStatus();
// 	}, []);

// 	// useEffect(() => {
// 	// 	fetchAverageRating(post.id);
// 	// }, [post.id]);

// 	// Hàm này tạo một array các component Icon dựa trên giá trị averageRating
// 	const renderStars = () => {
// 		const stars = [];
// 		if (averageRating !== null) {
// 			for (let i = 1; i <= 5; i++) {
// 				stars.push(
// 					<Icon
// 						key={i}
// 						name={
// 							i <= Math.round(averageRating) ? "star" : "star-o"
// 						} // Sử dụng icon 'star' hoặc 'star-o' tùy thuộc vào giá trị averageRating
// 						size={20}
// 						color="#FFD700" // Màu của icon sao
// 					/>
// 				);
// 			}
// 		}
// 		return stars;
// 	};

// 	return (
// 		<Card style={[MyStyles.margin, MyStyles.border]}>
// 			<TouchableHighlight
// 				activeOpacity={0.5}
// 				underlayColor="#DDDDDD"
// 				onPress={() =>
// 					navigation.navigate("ProfileNavigator", {
// 						userId: post.user.id,
// 					})
// 				}
// 			>
// 				<Card.Title
// 					title={`${post.user.first_name} ${post.user.last_name}`}
// 					subtitle={post.user.following}
// 					left={(props) => (
// 						<Avatar.Image
// 							{...props}
// 							size={50}
// 							source={{
// 								uri: post.user.avatar,
// 							}}
// 						/>
// 					)}
// 				/>
// 			</TouchableHighlight>

// 			<Card.Content style={{ margin: 0 }}>
// 				<Title>{post.title}</Title>
// 				<Paragraph>
// 					{post.starting_point} đến {post.end_point}
// 				</Paragraph>

// 				{<Hashtag hashtags={post.hashtags_read} />}
// 				<View style={{ flexDirection: "row", alignItems: "center" }}>
// 					{renderStars()}
// 					{averageRating !== null && (
// 						<Paragraph style={{ marginLeft: 5 }}>
// 							Average Rating: {averageRating.toFixed(2)}
// 						</Paragraph>
// 					)}
// 				</View>
// 			</Card.Content>
// 			{loading && <ActivityIndicator />}
// 			{<PostImages images={post.images} />}
// 			<Card.Actions>
// 				<View
// 					style={{
// 						flex: 1,
// 						flexDirection: "row",
// 						alignItems: "center",
// 					}}
// 				>
// 					<TextInput
// 						style={{
// 							borderRadius: 10,
// 							backgroundColor: "#fff",
// 							flex: 1,
// 						}}
// 						placeholder="Nhập bình luận..."
// 						mode="outlined"
// 						label="Comment"
// 						onFocus={toggleModal}
// 						value={comment}
// 						onChangeText={setComment}
// 					/>
// 					<IconButton
// 						icon="send"
// 						size={24}
// 						onPress={handleCommentSubmit}
// 						style={MyStyles.sendIcon}
// 					/>
// 				</View>
// 				{post.active ? (
// 					<></>
// 				) : (
// 					<Button
// 						icon={"send-circle"}
// 						onPress={() =>
// 							navigation.navigate("PostDetail", {
// 								postId: post.id,
// 							})
// 						}
// 					>
// 						Detail
// 					</Button>
// 				)}
// 				<Button
// 					icon={"star"}
// 					onPress={() =>
// 						navigation.navigate("RatingDetail", {
// 							postId: post.id,
// 						})
// 					}
// 				>
// 					Rating
// 				</Button>
// 			</Card.Actions>
// 			{post.active ? (
// 				<></>
// 			) : (
// 				<CommentModal
// 					isVisible={isModalVisible}
// 					postId={post.id}
// 					onClose={toggleModal}
// 				/>
// 			)}
// 		</Card>
// 	);
// };

// export default PostInfo;

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
import APIs, { endpoints } from "../../configs/APIs";

const PostInfo = ({ post, loading }) => {
	const navigation = useNavigation();
	const [averageRating, setAverageRating] = useState(null);
	const [isModalVisible, setModalVisible] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]); // New state to hold comments

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
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
					// Call the callback function to update comments
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
					subtitle={post.user.following}
					left={(props) => (
						<Avatar.Image
							{...props}
							size={50}
							source={{
								uri: post.user.avatar,
							}}
						/>
					)}
				/>
			</TouchableHighlight>

			<Card.Content style={{ margin: 0 }}>
				<Title>{post.title}</Title>
				<Paragraph>
					{post.starting_point} đến {post.end_point}
				</Paragraph>

				{<Hashtag hashtags={post.hashtags_read} />}
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					{/* Render stars function */}
					{averageRating !== null && (
						<Paragraph style={{ marginLeft: 5 }}>
							Average Rating: {averageRating.toFixed(2)}
						</Paragraph>
					)}
				</View>
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
						Detail
					</Button>

					<Button
						icon={"star"}
						onPress={() =>
							navigation.navigate("RatingDetail", {
								postId: post.id,
							})
						}
					>
						Rating
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
					onCommentAdded={onCommentAdded} // Pass the callback function
				/>
			)}
		</Card>
	);
};

export default PostInfo;
