import { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { Searchbar, Button } from "react-native-paper";
import MyStyles from "../../styles/MyStyles";
import APIs, { endpoints } from "../../configs/APIs";
import PostInfo from "../utils/PostInfo";

const Post = ({ navigation }) => {
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [q, setQ] = useState("");

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
				console.info("current page:", page);
				let url = `${endpoints["posts"]}?page=${page}&q=${q}`;
				const postsResponse = await APIs.get(url);
				if (postsResponse.data.next === null) {
					setPage(0);
				}
				if (page === 1) {
					const postsData = postsResponse.data;
					const postsWithImages = await handlePost(postsData);
					setPosts(postsWithImages);
				} else {
					const postsData = postsResponse.data;
					const postsWithImages = await handlePost(postsData);
					setPosts((current) => [...current, ...postsWithImages]);
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
			setPage((prevPage) => prevPage + 1);
		}
	};

	useEffect(() => {
		loadPost();
	}, [page, q]);

	const search = (value, callback) => {
		setPage(1);
		callback(value);
	};

	return (
		<View style={[MyStyles.container, MyStyles.margin]}>
			<View style={MyStyles.row}>
			<Searchbar
				style={MyStyles.searchBar}
				placeholder="Tìm kiếm chuyến đi..."
				onChangeText={(t) => search(t, setQ)}
			/>
			<Button
				style={MyStyles.buttonPlan}
				icon="plus-box-multiple"
				onPress={() => navigation.navigate('CreatePost')}
			>
				Tạo
			</Button>
			</View>
			<ScrollView onScroll={loadMore}>
				{loading && posts.length === 0 ? (
					<ActivityIndicator style={{ margin: 10 }} />
				) : (
					posts.map((post) => (
						<PostInfo
							key={post.id}
							post={post}
							loading={loading}
							navigation={navigation}
						/>
					))
				)}
			</ScrollView>
		</View>
	);
};

export default Post;
