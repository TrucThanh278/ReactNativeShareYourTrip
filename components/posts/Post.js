import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	View,
	ScrollView,
	TouchableHighlight,
	TextInput,
} from "react-native";
import MyStyles from "../../styles/MyStyles";
import Hashtag from "../hashtags/Hashtag";
import {
	Searchbar,
	Avatar,
	Button,
	Card,
	Title,
	Paragraph,
} from "react-native-paper";
import Styles from "./Styles";
import PostImages from "./PostImages";
import CommentsBottomSheet from "../comments/CommentsBottomSheet";
import APIs, { endpoints } from "../../configs/APIs";
import PostInfo from "../utils/PostInfo";

const Post = ({ navigation }) => {
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState(null);
	const [page, setPage] = useState(1);


	const handlePost = async (postsData) => {
		const postsWithImages = await Promise.all(
			postsData.results.map(async (post) => {
				const imageResponse = await APIs.get(
					`${endpoints["posts"]}${post.id}/images/`
				);
				return {
					...post,
					images: imageResponse.data,
				};
			})
		);
		return postsWithImages;
	};

	const loadPost = async () => {
		if (page > 0) {
			try {
				let url = `${endpoints["posts"]}?page=${page}`;
				const postsResponse = await APIs.get(url);
				if (postsResponse.data.next === null) {
					setPage(0);
				}
				if (page === 1) {
					const postsWithImages = await handlePost(
						postsResponse.data
					);
					setPosts(postsWithImages);
				} else {
					const postsWithImages = await handlePost(
						postsResponse.data
					);
					setPosts((current) => {
						return [...current, ...postsWithImages];
					});
				}
			} catch (error) {
				console.error("There was an error fetching the posts", error);
			} finally {
				setLoading(false);
			}
		}
	};

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
		if (!loading && page > 0 && isCloseToBottom(nativeEvent)) {
			setPage(page + 1);
		}
	};

	useEffect(() => {
		loadPost();
	}, [page]);

	return (
		<View style={[MyStyles.container, MyStyles.margin]}>
			<View>
				<Searchbar placeholder="Tìm chuyến đi..." />
			</View>
			<ScrollView onScroll={loadMore}>
				{posts === null ? (
					<ActivityIndicator style={{ margin: 10 }} />
				) : (
					posts.map((post) => (
						<PostInfo
							post={post}
							loading={loading}
							navigation={navigation}
							key={post.id}
						/>
					))
				)}
			</ScrollView>
		</View>
	);
};

export default Post;
