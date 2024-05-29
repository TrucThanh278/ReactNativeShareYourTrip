// import { TouchableHighlight, View } from "react-native";
// import {
// 	ActivityIndicator,
// 	Avatar,
// 	Button,
// 	Card,
// 	Paragraph,
// 	TextInput,
// 	Title,
// } from "react-native-paper";
// import MyStyles from "../../styles/MyStyles";
// import Hashtag from "../hashtags/Hashtag";
// import PostImages from "../posts/PostImages";

// const PostInfo = ({ post, loading, navigation }) => {
// 	return (
// 		<Card style={[MyStyles.margin, MyStyles.border]}>
// 			<TouchableHighlight
// 				activeOpacity={0.5}
// 				underlayColor="#DDDDDD"
// 				onPress={() => alert("Pressed!")}
// 			>
// 				<Card.Title
// 					title={`${post.user.first_name} ${post.user.last_name}`}
// 					subtitle="1090 followers"
// 					left={(props) => (
// 						<Avatar.Image
// 							{...props}
// 							size={50}
// 							source={{
// 								uri: post.user.avatar,
// 							}}
// 						/>
// 					)}
// 				/>
// 			</TouchableHighlight>

// 			<Card.Content style={{ margin: 0 }}>
// 				<Title>{post.title}</Title>
// 				<Paragraph>
// 					{post.starting_point} to {post.end_point}
// 				</Paragraph>
// 				{<Hashtag hashtags={post.hashtags} />}
// 			</Card.Content>
// 			{loading && <ActivityIndicator />}
// 			{<PostImages images={post.images} />}
// 			<Card.Actions>
// 				<View style={{ flex: 1 }}>
// 					<TextInput
// 						style={{
// 							borderRadius: 10,
// 							width: "100%",
// 							backgroundColor: "#fff",
// 						}}
// 						placeholder={"Nhập comment..."}
// 						mode="outlined"
// 						label={"Comment"}
// 					/>
// 				</View>
// 				{post.active ? (
// 					<></>
// 				) : (
// 					<Button
// 						icon={"send-circle"}
// 						onPress={() =>
// 							navigation.navigate("PostDetail", {
// 								postId: post.id,
// 							})
// 						}
// 					>
// 						Chi tiết
// 					</Button>
// 				)}
// 			</Card.Actions>
// 		</Card>
// 	);
// };

// export default PostInfo;

import React, { useState } from "react";
import { TouchableHighlight, View, Modal } from "react-native";
import {
	ActivityIndicator,
	Avatar,
	Button,
	Card,
	IconButton,
	Paragraph,
	TextInput,
	Title,
} from "react-native-paper";
import MyStyles from "../../styles/MyStyles";
import Hashtag from "../hashtags/Hashtag";
import PostImages from "../posts/PostImages";
import CommentModal from "../comments/CommentModal"; // Import CommentModal

const PostInfo = ({ post, loading, navigation }) => {
	const [isModalVisible, setModalVisible] = useState(false);

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	return (
		<Card style={[MyStyles.margin, MyStyles.border]}>
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
							source={{ uri: post.user.avatar }}
						/>
					)}
				/>
			</TouchableHighlight>

			<Card.Content style={{ margin: 0 }}>
				<Title>{post.title}</Title>
				<Paragraph>
					{post.starting_point} to {post.end_point}
				</Paragraph>
				<Hashtag hashtags={post.hashtags} />
			</Card.Content>
			{loading && <ActivityIndicator />}
			<PostImages images={post.images} />
			<Card.Actions>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<TextInput
						style={{
							borderRadius: 10,
							backgroundColor: "#fff",
							flex: 1,
						}}
						placeholder="Nhập comment..."
						mode="outlined"
						label="Comment"
						onFocus={toggleModal} // Show modal when TextInput is focused
					/>
					<IconButton
						icon="send"
						size={24}
						onPress={() => alert("Hello")}
						style={MyStyles.sendIcon}
					/>
				</View>
				{post.active ? (
					<></>
				) : (
					<Button
						onPress={() =>
							navigation.navigate("PostDetail", {
								postId: post.id,
							})
						}
					>
						Chi tiết
					</Button>
				)}
			</Card.Actions>

			{post.active ? (
				<></>
			) : (
				<CommentModal
					isVisible={isModalVisible}
					postId={post.id}
					onClose={toggleModal}
				/>
			)}
		</Card>
	);
};

export default PostInfo;
