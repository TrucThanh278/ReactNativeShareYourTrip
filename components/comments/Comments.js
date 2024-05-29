import React, { useState } from "react";
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
import CommentLoader from "./CommentLoader";
import CommentModal from "../comments/CommentModal";

const Comments = ({ postId, comments, loading, setPage }) => {
	const [commentsVisible, setCommentsVisible] = useState(false);
	const isCloseToBottom = ({
		layoutMeasurement,
		contentOffset,
		contentSize,
	}) => {
		const paddingToBottom = 20;
		return (
			layoutMeasurement.height + contentOffset.y >=
			contentSize.height - paddingToBottom
		);
	};

	const loadMore = ({ nativeEvent }) => {
		if (!loading && isCloseToBottom(nativeEvent)) {
			setPage((prevPage) => prevPage + 1);
		}
	};

	const handleCommentReply = () => {
		alert("Comment!");
	};

	return (
		<ScrollView
			contentContainerStyle={Styles.scrollViewContainer}
			onScroll={loadMore}
		>
			{loading ? (
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
												{comment.user.first_name}{" "}
												{comment.user.last_name}
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
										onPress={() => handleCommentReply()}
									>
										Phản hồi
									</Text>
								</Card.Content>
							</Card>
							{comment.replies.length > 0 && (
								<View style={Styles.repliesContainer}>
									{comment.replies.map((reply) => (
										<Comments
											key={reply.id}
											postId={postId}
											comments={[reply]}
											loading={loading}
											setPage={setPage}
										/>
									))}
								</View>
							)}
						</View>
					))}
				</>
			)}
		</ScrollView>
	);
};

// Nhận props ở component cha (ở đây là postId)
// Hàm ở dưới chính là chidren dựa theo cú pháp JSX
export default (props) => (
	<CommentLoader {...props}>
		{({ comments, loading, setPage }) => (
			<Comments
				{...props}
				comments={comments}
				loading={loading}
				setPage={setPage}
			/>
		)}
	</CommentLoader>
);
