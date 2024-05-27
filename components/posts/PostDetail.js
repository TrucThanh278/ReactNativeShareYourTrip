import { ScrollView, Text, TouchableHighlight, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { ActivityIndicator } from "react-native-paper";
import { useEffect, useState } from "react";
import APIs, { endpoints } from "../../configs/APIs";
import PostInfo from "../utils/PostInfo";
import Comments from "../comments/Comments";

const PostDetail = ({ route }) => {
	const [loading, setLoading] = useState(true);
	const [postDetail, setPostDetail] = useState(null);
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

	useEffect(() => {
		loadPostDetail();
	}, [postId]);

	return (
		<ScrollView style={[MyStyles.container]}>
			{postDetail === null ? (
				<ActivityIndicator />
			) : (
				<>
					<PostInfo post={postDetail} loading={loading} />
				</>
			)}
			<Comments postId={postId} />
		</ScrollView>
	);
};

export default PostDetail;
