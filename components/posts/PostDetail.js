import React, { useEffect, useState } from "react";
import {
	View,
	ActivityIndicator,
	FlatList,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
} from "react-native";
import MyStyles from "../../styles/MyStyles";
import APIs, { endpoints } from "../../configs/APIs";
import PostInfo from "../utils/PostInfo";
import CommentItem from "../comments/CommentItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PostDetail = ({ route }) => {
	const [loading, setLoading] = useState(true);
	const [postDetail, setPostDetail] = useState(null);
	const [comments, setComments] = useState([]);
	const [page, setPage] = useState(1);
	const [hasNextPage, setHasNextPage] = useState(true);
	const [replyTo, setReplyTo] = useState(null);
	const [commentText, setCommentText] = useState("");
	const postId = route.params?.postId;

	const handlePost = async (postData) => {
		const imageResponse = await APIs.get(
			`${endpoints["posts"]}${postData.id}/images/`
		);
		return {
			...postData,
			images: imageResponse.data,
		};
	};

	const loadPostDetail = async () => {
		try {
			let res = await APIs.get(endpoints["postsDetails"](postId));
			const postDetailData = await handlePost(res.data);
			setPostDetail(postDetailData);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const loadComments = async (page) => {
		setLoading(true);
		try {
			const response = await APIs.get(
				`${endpoints["comments"](postId)}?page=${page}`
			);
			if (page === 1) {
				setComments(response.data.results);
			} else {
				setComments((prevComments) => [
					...prevComments,
					...response.data.results,
				]);
			}
			setHasNextPage(!!response.data.next);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setPage(1);
	}, [postId]);

	useEffect(() => {
		if (postId) {
			loadPostDetail();
			loadComments(page);
		}
	}, [postId, page]);

	const renderPostInfo = () => {
		return (
			<View>
				{postDetail ? (
					<PostInfo post={postDetail} />
				) : (
					<ActivityIndicator />
				)}
			</View>
		);
	};

	const renderComment = ({ item }) => {
		return (
			<CommentItem
				comment={item}
				isLoggedIn={true}
				onReply={(comment) => setReplyTo(comment)}
			/>
		);
	};

	const renderFooter = () => {
		if (!loading || !hasNextPage) return null;
		return <ActivityIndicator />;
	};

	const handleSendComment = async () => {
		const token = await AsyncStorage.getItem("token");
		if (!token) {
			Alert.alert("Chưa đăng nhập", "Vui lòng đăng nhập để bình luận");
			return;
		}
		if (!commentText.trim()) {
			Alert.alert("Thông báo", "Nội dung bình luận không được để trống.");
			return;
		}
		try {
			const response = await APIs.post(
				endpoints["comments"](postId),
				{
					content: commentText,
					parent_comment: replyTo ? replyTo.id : null,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			const newComment = response.data;
			if (replyTo) {
				// Tìm bình luận cha và thêm bình luận mới vào replies của nó
				setComments((prevComments) =>
					prevComments.map((comment) =>
						comment.id === replyTo.id
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
				setComments((prevComments) => [newComment, ...prevComments]);
			}

			setCommentText("");
			setReplyTo(null);
		} catch (err) {
			console.log("Bình luận thất bại!!!", err);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={[{ key: "post-info" }, ...comments]}
				renderItem={({ item }) =>
					item.key === "post-info"
						? renderPostInfo()
						: renderComment({ item })
				}
				keyExtractor={(item, index) =>
					item.key ? item.key : `${item.id}-${index}`
				}
				ListFooterComponent={renderFooter}
				onEndReached={() => {
					if (hasNextPage && !loading) {
						setPage((prevPage) => prevPage + 1);
					}
				}}
				onEndReachedThreshold={0.5}
			/>
			{replyTo && (
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						padding: 10,
					}}
				>
					<Text>
						Đang phản hồi {replyTo.user.first_name}{" "}
						{replyTo.user.last_name}
					</Text>
					<TouchableOpacity onPress={() => setReplyTo(null)}>
						<Text style={{ marginLeft: 10, color: "blue" }}>
							Hủy
						</Text>
					</TouchableOpacity>
				</View>
			)}
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					padding: 10,
				}}
			>
				<TextInput
					style={{
						flex: 1,
						borderColor: "gray",
						borderWidth: 1,
						borderRadius: 20,
						padding: 10,
					}}
					placeholder="Nhập bình luận..."
					value={commentText}
					onChangeText={setCommentText}
				/>
				<TouchableOpacity onPress={handleSendComment}>
					<Text style={{ marginLeft: 10, color: "blue" }}>Gửi</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default PostDetail;
