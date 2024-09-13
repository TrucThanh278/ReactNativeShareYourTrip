import React, { useState } from "react";
import { Text, View, Button, Image, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

const AddImage = ({ navigation, route }) => {
	const { postId, token } = route.params;
	console.log("Image token", token, postId);

	const [imageUri, setImageUri] = useState(null);

	const pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			console.log("Result of image picker:", result);

			if (
				!result.cancelled &&
				result.assets &&
				result.assets.length > 0
			) {
				const uri = result.assets[0].uri;
				console.log("Selected Image URI:", uri);
				setImageUri(uri);
			}
		} catch (error) {
			console.log("Error picking image:", error);
		}
	};

	const handleUploadImage = async () => {
		try {
			if (!imageUri) {
				Alert.alert("Lỗi", "Vui lòng chọn ảnh");
				return;
			}

			const formData = new FormData();
			formData.append("image", {
				uri: imageUri,
				name: "image.jpg",
				type: "image/jpeg",
			});
			formData.append("post", postId);

			console.log("FormData:", formData);
			const response = await fetch(
				"http://192.168.1.47:8000/images/",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
					body: formData,
				}
			);

			if (response.ok) {
				Alert.alert("Thành công", "Đăng ảnh thành công");
				setImageUri(null);
			} else {
				Alert.alert("Thất bại", "Đăng ảnh thất bại");
			}
		} catch (error) {
			console.error("Error uploading image:", error);
			Alert.alert("Lỗi", "Lỗi đăng ảnh");
		}
	};

	return (
		<View style={styles.container}>
			{imageUri ? (
				<Image source={{ uri: imageUri }} style={styles.image} />
			) : (
				<Text>No image selected</Text>
			)}
			<View style={styles.marginTop}>
				<Button title="Chọn ảnh" onPress={pickImage} />
			</View>
			<View style={styles.marginTop}>
				<Button title="Đăng ảnh" onPress={handleUploadImage} />
			</View>
			<View style={styles.margin}>
				<Button
					title="Trở về trang chủ"
					onPress={() => navigation.navigate("HomeScreen")}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	image: {
		width: 200,
		height: 200,
		marginBottom: 20,
	},
	margin: {
		marginTop: 200,
	},
	marginTop: {
		marginTop: 10,
	},
});

export default AddImage;
