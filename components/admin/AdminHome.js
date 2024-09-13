import React, { useEffect, useState, useContext } from "react";
import {
	View,
	Image,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import { MyDispatchContext, MyUserContext } from "../../configs/Context";
import MyStyles from "../../styles/MyStyles";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/APIs";
import Logout from "../Users/Logout";

const AdminHome = ({ navigation }) => {
	const dispatch = useContext(MyDispatchContext);
	const [user, setUser] = useState(null);
	const [avatar, setAvatar] = useState(null);
	const [coverPhoto, setCoverPhoto] = useState(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const token = await AsyncStorage.getItem("token");
				if (token) {
					const response = await authApi(token).get(
						endpoints["current-user"]
					);
					setUser(response.data);
					setAvatar(response.data.avatar);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchUserData();
	}, []);

	const pickAvatar = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			setAvatar(result.uri);
		}
	};

	const pickCoverPhoto = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [16, 9],
			quality: 1,
		});

		if (!result.cancelled) {
			setCoverPhoto(result.uri);
		}
	};

	if (!user) {
		return <Text>Loading...</Text>;
	}

	return (
		<ScrollView style={[MyStyles.container, MyStyles.margin]}>
			<View>
				<TouchableOpacity onPress={pickCoverPhoto}>
					<Image
						source={
							coverPhoto
								? { uri: coverPhoto }
								: require("../Users/assets/images/default_cover.jpg")
						}
						style={styles.coverPhoto}
					/>
				</TouchableOpacity>
				<View style={[styles.position, styles.margin_avatar]}>
					<TouchableOpacity onPress={pickAvatar}>
						{avatar ? (
							<Image
								source={{ uri: avatar }}
								style={styles.avatar}
							/>
						) : (
							<Image
								source={require("../Users/assets/images/default_cover.jpg")}
								style={styles.avatar}
							/>
						)}
					</TouchableOpacity>
				</View>
				<View style={{ marginTop: 25 }}>
					<Text style={[styles.subject, styles.margin_left]}>
						Wellcome to Admin !!!
					</Text>
					<Text style={[styles.subject, styles.margin_left]}>
						{" "}
						{user.first_name} {user.last_name}
					</Text>
					<Text style={[styles.text, styles.margin_left]}>
						Email: {user.email}
					</Text>
					<Text style={[styles.text, styles.margin_left]}>
						Số điện thoại: {user.phone_number}
					</Text>
					<Text style={[styles.text, styles.margin_left]}>
						Địa chỉ: {user.address}
					</Text>
					<Text style={[styles.text, styles.margin_left]}>
						Ngày sinh: {user.date_of_birth}
					</Text>
					<Button
						icon="pencil"
						buttonColor="rgb(79, 133, 13)"
						mode="contained"
						onPress={() => navigation.navigate("UpdateProfile")}
						style={[styles.text]}
					>
						Cập nhật hồ sơ
					</Button>
					<Logout navigation={navigation} />
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	subject: {
		fontSize: 20,
		marginBottom: 10,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 10,
	},
	coverPhoto: {
		width: "100%",
		height: 200,
		marginBottom: 10,
	},
	text: {
		marginBottom: 5,
	},
	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	position: {
		position: "absolute",
		top: 100,
		left: 10,
	},
	margin_avatar: {
		marginTop: 30,
		marginLeft: 135,
	},
	margin_right: {
		marginRight: 15,
	},
	collections: {
		padding: 20,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	stats: {
		padding: 20,
	},
	statItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 10,
	},
	statLabel: {
		fontSize: 18,
	},
	statValue: {
		fontSize: 18,
		color: "#888",
	},
	margin_left: {
		textAlign: "center",
	},
});

export default AdminHome;
