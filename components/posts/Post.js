import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	View,
	ScrollView,
	TouchableHighlight,
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
import APIs, { endpoints } from "../../configs/APIs";

const Post = () => {
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState(null);
	const [page, setPage] = useState(1);

	// const postsWithImages = await Promise.all(
	// 	postsData.results.map(async (post) => {
	// 		const imageResponse = await APIs.get(
	// 			`${endpoints["posts"]}${post.id}/images/`
	// 		);
	// 		return { ...post, images: imageResponse.data };
	// 	})
	// );

	// const loadImages = (postsData) => {
	// 	postsData.map(async (post) => {
	// 		const imageResponse = await APIs.get(
	// 			`${endpoints["posts"]}${post.id}/images/`
	// 		);
	// 		return {
	// 			...post,
	// 			images: imageResponse.data,
	// 		};
	// 	});
	// };

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
					const postsData = postsResponse.data;
					const postsWithImages = await handlePost(postsData);
					setPosts(postsWithImages);
				} else {
					const postsData = postsResponse.data;
					const postsWithImages = await handlePost(postsData);
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
			<ScrollView style={Styles.backgroundColor} onScroll={loadMore}>
				{posts === null ? (
					<ActivityIndicator style={{ margin: 10 }} />
				) : (
					posts.map((post) => (
						<Card
							style={[MyStyles.margin, MyStyles.border]}
							key={post.id}
						>
							<TouchableHighlight
								activeOpacity={0.5}
								underlayColor="#DDDDDD"
								onPress={() => alert("Pressed!")}
							>
								<Card.Title
									title={`${post.user.first_name} ${post.user.last_name}`}
									subtitle="1090 followers"
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
									{post.starting_point} to {post.end_point}
								</Paragraph>
								{<Hashtag hashtags={post.hashtags} />}
							</Card.Content>
							{loading && <ActivityIndicator />}
							{<PostImages images={post.images} />}
							<Card.Actions>
								<Button>Comment</Button>
							</Card.Actions>
						</Card>
					))
				)}
			</ScrollView>
		</View>
	);
};

export default Post;
