import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Avatar, Paragraph, Checkbox } from "react-native-paper";
import moment from "moment";
import styles from "./Styles";

const CommentItem = ({ comment, isLoggedIn, onReply }) => {
	const [checked, setChecked] = useState(false);
	const depth = comment.depth ?? 0;

	const handleCommentReply = () => {
		if (!isLoggedIn) {
			Alert.alert(
				"Yêu cầu đăng nhập",
				"Bạn cần đăng nhập để bình luận.",
				[{ text: "OK" }]
			);
		} else {
			onReply(comment);
		}
	};

	return (
		<View style={[styles.commentContainer]}>
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
				<TouchableOpacity onPress={handleCommentReply}>
					<Text style={styles.replyButton}>Phản hồi</Text>
				</TouchableOpacity>

				{comment.replies && comment.replies.length > 0 && (
					<View>
						{comment.replies.map((reply) => (
							<CommentItem
								key={`${reply.id}-${reply.depth}`}
								comment={reply}
								isLoggedIn={isLoggedIn}
								onReply={onReply}
							/>
						))}
					</View>
				)}
			</View>
		</View>
	);
};

export default CommentItem;
