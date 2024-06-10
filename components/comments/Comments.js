import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import {
	Avatar,
	Text,
	Card,
	Paragraph,
	ActivityIndicator,
} from "react-native-paper";
import Styles from "./Styles";
import moment from "moment";
import APIs, { endpoints } from "../../configs/APIs";

export default Comments = ({ comment, replies, onReply, postId }) => {
	const [comments, setComments] = useState(null);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);

	const loadComments = async () => {
		if (page > 0) {
			try {
				let url = `${endpoints.comments(postId)}?page=${page}`;
				const res = await APIs.get(url);
				if (res.data.next === null) {
					setPage(0);
				}
				if (page === 1) {
					setComments(res.data.results);
				} else {
					setComments((comments) => [
						...comments,
						...res.data.results,
					]);
				}
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}
	};

	const handleCommentReply = () => {};

	useEffect(() => {
		loadComments();
	}, [page]);

	return (
		<ScrollView contentContainerStyle={Styles.scrollViewContainer}>
			{loading === true ? (
				<ActivityIndicator />
			) : (
				<>
					{comments.map((comment) => (
						<View style={Styles.container} key={comment.id}>
							<Card
								style={Styles.commentContainer}
								mode="contained"
							>
								<Card.Content style={Styles.commentContent}>
									<View style={Styles.commentHeader}>
										<Avatar.Image
											source={{
												uri: comment.user.avatar,
											}}
											size={36}
										/>
										<View style={Styles.userInfo}>
											<Text style={Styles.userName}>
												{comment.first_name}{" "}
												{comment.last_name}
											</Text>
											<Text style={Styles.commentDate}>
												{moment(
													comment.created_date
												).fromNow()}
											</Text>
										</View>
									</View>
									<Paragraph style={Styles.commentText}>
										{comment.content}
									</Paragraph>
									<Text
										style={Styles.replyButton}
										onPress={() => onReply(comment.id)}
									>
										Phản hồi
									</Text>
								</Card.Content>
							</Card>
							{/* {replies.length > 0 && (
					<View style={Styles.repliesContainer}>
						{replies.map((reply) => (
							<Comments
								key={reply.id}
								comment={reply}
								replies={[]}
								onReply={onReply}
							/>
						))}
					</View>
				)} */}
						</View>
					))}
				</>
			)}

			{/* <View style={Styles.container}>
				<Card style={Styles.commentContainer} mode="contained">
					<Card.Content style={Styles.commentContent}>
						<View style={Styles.commentHeader}>
							<Avatar.Image
								source={{ uri: comment.userAvatar }}
								size={36}
							/>
							<View style={Styles.userInfo}>
								<Text style={Styles.userName}>
									{comment.userName}
								</Text>
								<Text style={Styles.commentDate}>
									{moment(comment.createdAt).fromNow()}
								</Text>
							</View>
						</View>
						<Paragraph style={Styles.commentText}>
							{comment.content}
						</Paragraph>
						<Text
							style={Styles.replyButton}
							onPress={() => onReply(comment.id)}
						>
							Phản hồi
						</Text>
					</Card.Content>
				</Card>
				{replies.length > 0 && (
					<View style={Styles.repliesContainer}>
						{replies.map((reply) => (
							<Comments
								key={reply.id}
								comment={reply}
								replies={[]}
								onReply={onReply}
							/>
						))}
					</View>
				)}
			</View> */}
		</ScrollView>
	);
};

// const App = () => {
// 	// Dữ liệu giả cho comment
// 	// const comments = [
// 	// 	{
// 	// 		id: 1,
// 	// 		userAvatar:
// 	// 			"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
// 	// 		userName: "John Doe",
// 	// 		content: "This is a great app!",
// 	// 		createdAt: new Date("2023-05-26T10:00:00"),
// 	// 		replies: [
// 	// 			{
// 	// 				id: 2,
// 	// 				userAvatar:
// 	// 					"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
// 	// 				userName: "Jane Smith",
// 	// 				content: "Thank you! We worked hard on it.",
// 	// 				createdAt: new Date("2023-05-26T10:30:00"),
// 	// 				replies: [],
// 	// 			},
// 	// 			{
// 	// 				id: 3,
// 	// 				userAvatar:
// 	// 					"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
// 	// 				userName: "Bob Johnson",
// 	// 				content: "I agree, it looks amazing!",
// 	// 				createdAt: new Date("2023-05-26T11:00:00"),
// 	// 				replies: [
// 	// 					{
// 	// 						id: 4,
// 	// 						userAvatar:
// 	// 							"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
// 	// 						userName: "Emily Davis",
// 	// 						content: "Thanks for the feedback!",
// 	// 						createdAt: new Date("2023-05-26T11:15:00"),
// 	// 						replies: [],
// 	// 					},
// 	// 				],
// 	// 			},
// 	// 		],
// 	// 	},
// 	// 	{
// 	// 		id: 5,
// 	// 		userAvatar:
// 	// 			"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
// 	// 		userName: "Mike Williams",
// 	// 		content: "I encountered a bug in the latest version...",
// 	// 		createdAt: new Date("2023-05-26T12:00:00"),
// 	// 		replies: [],
// 	// 	},
// 	// ];

// 	const handleReply = (commentId) => {
// 		console.log(`Phản hồi cho comment có id: ${commentId}`);
// 	};

// 	return (
// 		<ScrollView contentContainerStyle={Styles.scrollViewContainer}>
// 			{comments.map((comment) => (
// 				<Comments
// 					key={comment.id}
// 					comment={comment}
// 					replies={comment.replies}
// 					onReply={handleReply}
// 				/>
// 			))}
// 		</ScrollView>
// 	);
// };
// export default App;
