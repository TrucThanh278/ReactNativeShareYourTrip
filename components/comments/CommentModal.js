import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	Alert,
} from "react-native";
import Modal from "react-native-modal";
import {
	Avatar,
	Paragraph,
	ActivityIndicator,
	IconButton,
} from "react-native-paper";
import moment from "moment";
import APIs, { endpoints } from "../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CommentModal = ({ isVisible, onClose, postId }) => {
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [hasNextPage, setHasNextPage] = useState(true);
	const [commentText, setCommentText] = useState("");
	const [replyingTo, setReplyingTo] = useState(null);

	const loadComments = async (postId, page) => {
		if (page > 0 && hasNextPage) {
			try {
				let url = `${endpoints.comments(postId)}?page=${page}`;
				const res = await APIs.get(url);
				if (res.data.results) {
					setComments((prevComments) => [
						...prevComments,
						...res.data.results,
					]);
					setHasNextPage(res.data.next !== null);
				}
				setLoading(false);
			} catch (err) {
				console.log(err);
			}
		}
	};

	useEffect(() => {
		loadComments(postId, page);
	}, [page]);

	const handleCommentReply = async () => {
		try {
			const token = await AsyncStorage.getItem("token");
			if (!token) {
				Alert.alert(
					"Chưa đăng nhập",
					"Vui lòng đăng nhập để bình luận"
				);
				return;
			}
			if (!commentText.trim()) {
				Alert.alert(
					"Thông báo,",
					"Nội dung bình luận không được để trống!!!"
				);
				return;
			} else {
				try {
					const response = await APIs.post(
						endpoints["comments"](postId),
						{
							content: commentText,
							parent_comment: replyingTo ? replyingTo.id : null,
						},
						{
							headers: {
								Authorization: `Bearer ${token}`,
								"Content-Type": "application/json",
							},
						}
					);
					const newComment = response.data;
					if (replyingTo) {

						setComments((prevComments) =>
							prevComments.map((comment) =>
								comment.id === replyingTo.id
									? {
										...comment,
										replies: [
											...(comment.replies || []),
											newComment,
										],
									}
									: comment
							)
						);
					} else {
						setComments((prevComments) => [
							newComment,
							...prevComments,
						]);
					}

					setCommentText("");
					setReplyingTo(null);
				} catch (error) {
					console.log("Có lỗi khi gửi bình luận!!!", error);
				}
			}
		} catch (err) {
			console.log("Lỗi không lấy được token!!!", err);
		}
	};

	const CommentItem = ({ comment, depth = 0, parentId = null }) => (
		<View style={[styles.commentContainer, { marginLeft: depth * 20 }]}>
			<Avatar.Image source={{ uri: comment.user.avatar }} size={36} />
			<View style={styles.commentContent}>
				<Text style={styles.userName}>
					{comment.user.first_name} {comment.user.last_name}
				</Text>
				<Text style={styles.commentDate}>
					{moment(comment.created_date).fromNow()}
				</Text>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Paragraph>{comment.content}</Paragraph>
				</View>
				<TouchableOpacity onPress={() => setReplyingTo(comment)}>
					<Text style={styles.replyButton}>Reply</Text>
				</TouchableOpacity>
				{comment.replies && comment.replies.length > 0 && (
					<FlatList
						data={comment.replies}
						renderItem={({ item }) => (
							<CommentItem
								comment={item}
								depth={depth + 1}
								parentId={comment.id}
							/>
						)}
						keyExtractor={(item) => `reply-${parentId}-${item.id}`}
					/>
				)}
			</View>
		</View>
	);

	return (
		<Modal
			isVisible={isVisible}
			onBackdropPress={onClose}
			swipeDirection="down"
			onSwipeComplete={onClose}
			style={styles.modal}
		>
			<View style={styles.modalContent}>
				<View style={styles.handle} />
				{loading && comments.length === 0 ? (
					<ActivityIndicator />
				) : (
					<FlatList
						data={comments}
						renderItem={({ item }) => (
							<CommentItem comment={item} />
						)}
						keyExtractor={(item, index) =>
							`comment-${item.id}-${index}`
						} // Sửa keyExtractor
						onEndReached={() =>
							hasNextPage && setPage((prevPage) => prevPage + 1)
						}
						onEndReachedThreshold={0.1}
					/>
				)}
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={80}
					style={styles.inputContainer}
				>
					{replyingTo && (
						<View style={styles.replyingToContainer}>
							<Text style={styles.replyingToText}>
								Đang trả lời {replyingTo.user.first_name}{" "}
								{replyingTo.user.last_name}
							</Text>
							<TouchableOpacity
								onPress={() => setReplyingTo(null)}
							>
								<Text style={styles.cancelReply}>Hủy</Text>
							</TouchableOpacity>
						</View>
					)}
					<View style={styles.textInputWrapper}>
						<TextInput
							style={styles.input}
							placeholder="Nhập bình luận..."
							value={commentText}
							onChangeText={setCommentText}
						/>
						<IconButton
							icon="send"
							size={24}
							onPress={handleCommentReply}
							style={styles.sendIcon}
						/>
					</View>
				</KeyboardAvoidingView>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: "flex-end",
		margin: 0,
	},
	modalContent: {
		backgroundColor: "white",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		padding: 20,
		height: "80%",
	},
	handle: {
		width: 40,
		height: 5,
		backgroundColor: "#ccc",
		alignSelf: "center",
		marginVertical: 10,
		borderRadius: 3,
	},
	commentContainer: {
		flexDirection: "row",
		marginBottom: 10,
	},
	commentContent: {
		flex: 1,
		marginLeft: 10,
	},
	userName: {
		fontWeight: "bold",
	},
	commentDate: {
		color: "gray",
		fontSize: 12,
	},
	replyButton: {
		color: "blue",
	},
	inputContainer: {
		paddingVertical: 10,
		borderTopWidth: 1,
		borderColor: "#ccc",
		backgroundColor: "#fff",
	},
	textInputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 10,
	},
	input: {
		flex: 1,
		padding: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
	},
	sendIcon: {
		marginLeft: 10,
	},
	replyingToContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 10,
		paddingBottom: 10,
	},
	replyingToText: {
		flex: 1,
		fontStyle: "italic",
	},
	cancelReply: {
		color: "blue",
		fontWeight: "bold",
	},
});

export default CommentModal;
