import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import Modal from "react-native-modal";
import {
	Avatar,
	Paragraph,
	ActivityIndicator,
	IconButton,
	Checkbox,
} from "react-native-paper";
import moment from "moment";
import CommentLoader from "./CommentLoader";
import { CheckBox } from "react-native-elements";

const Comment = ({ comment }) => {
	const [checked, setChecked] = useState(false);
	const depth = comment.depth ?? 0; // Ensure depth is a valid number
	return (
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
					<Checkbox
						status={checked ? "checked" : "unchecked"}
						onPress={() => {
							setChecked(!checked);
						}}
						style={{}}
					/>
				</View>
				<TouchableOpacity onPress={() => alert("Reply")}>
					<Text style={styles.replyButton}>Reply</Text>
				</TouchableOpacity>

				{comment.replies && comment.replies.length > 0 && (
					<FlatList
						data={comment.replies}
						renderItem={({ item }) => <Comment comment={item} />}
						keyExtractor={(item) => item.id.toString()}
					/>
				)}
			</View>
		</View>
	);
};

const CommentModal = ({ isVisible, onClose, postId }) => {
	const [commentText, setCommentText] = useState("");

	const handleSendComment = () => {
		if (commentText.trim()) {
			// Thực hiện hành động gửi bình luận ở đây
			alert(`Comment sent: ${commentText}`);
			setCommentText(""); // Reset text input
		}
	};

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
				<CommentLoader postId={postId}>
					{({ comments, loading, setPage, hasNextPage }) => (
						<>
							{loading && comments.length === 0 ? (
								<ActivityIndicator />
							) : (
								<FlatList
									data={comments}
									renderItem={({ item }) => (
										<Comment comment={item} />
									)}
									keyExtractor={(item) => item.id.toString()}
									onEndReached={() =>
										hasNextPage &&
										setPage((prevPage) => prevPage + 1)
									}
									onEndReachedThreshold={0.1}
								/>
							)}
						</>
					)}
				</CommentLoader>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={80}
					style={styles.inputContainer}
				>
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
							onPress={handleSendComment}
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
});

export default CommentModal;
