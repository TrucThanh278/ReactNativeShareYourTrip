import React, { useState, useContext } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Button,
	Alert,
	Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/APIs";
import MyStyles from "../../styles/MyStyles";
import { MyDispatchContext, MyUserContext } from "../../configs/Context";
import * as ImagePicker from "expo-image-picker";
import { TouchableRipple } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

const UpdateProfile = ({ navigation }) => {
	const dispatch = useContext(MyDispatchContext);
	const user = useContext(MyUserContext);

	const [formData, setFormData] = useState({
		first_name: user.first_name,
		last_name: user.last_name,
		email: user.email,
		phone_number: user.phone_number,
		gender: user.gender,
		address: user.address,
		date_of_birth: user.date_of_birth,
		password: "",
		avatar: user.avatar,
	});

	const handleChange = (name, value) => {
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async () => {
		try {
			const token = await AsyncStorage.getItem("token");
			if (!token) {
				throw new Error("Token không tồn tại");
			}

			const formDataObj = new FormData();
			formDataObj.append("first_name", formData.first_name);
			formDataObj.append("last_name", formData.last_name);
			formDataObj.append("email", formData.email);
			formDataObj.append("phone_number", formData.phone_number);
			formDataObj.append("gender", formData.gender);
			formDataObj.append("address", formData.address);
			formDataObj.append("date_of_birth", formData.date_of_birth);
			formDataObj.append("password", formData.password);
			if (formData.avatar) {
				formDataObj.append("avatar", {
					uri: formData.avatar,
					type: "image/jpeg",
					name: "avatar.jpg",
				});
			}
			const response = await authApi(token).patch(endpoints["current-user"], formDataObj, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			const responseData = await response.json();

			if (response.ok) {
				dispatch({ type: "update_user", payload: responseData });
				Alert.alert("Thành công", "Cập nhật hồ sơ thành công");
				navigation.goBack();
			} else {
				throw new Error(
					responseData.detail || "Có lỗi xảy ra khi cập nhật hồ sơ"
				);
			}
		} catch (error) {
			console.error("Lỗi khi cập nhật hồ sơ:", error);
			Alert.alert("Lỗi", error.message);
		}
	};

	return (
		<ScrollView style={[styles.colorGround]}>
			<View style={[styles.background, MyStyles.margin, styles.margin]}>
				{user.avatar && (
					<Image
						source={{ uri: user.avatar }}
						style={styles.avatar}
					/>
				)}
				<Text style={styles.name}>
					{formData.first_name} {formData.last_name}
				</Text>
			</View>

			<ScrollView
				style={[styles.background, MyStyles.margin, styles.marginBot]}
			>
				<TouchableRipple >
					<Text
						style={[
							MyStyles.margin,
							{ color: "white", marginTop: 20 },
						]}
					>
						Chọn ảnh đại diện...
					</Text>
				</TouchableRipple>

				<TextInput
					style={styles.input}
					placeholder="Tên"
					value={formData.first_name}
					onChangeText={(value) => handleChange("first_name", value)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Họ"
					value={formData.last_name}
					onChangeText={(value) => handleChange("last_name", value)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Email"
					value={formData.email}
					onChangeText={(value) => handleChange("email", value)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Số điện thoại"
					value={formData.phone_number}
					onChangeText={(value) =>
						handleChange("phone_number", value)
					}
				/>
				<TextInput
					style={styles.input}
					placeholder="Giới tính"
					value={formData.gender}
					onChangeText={(value) => handleChange("gender", value)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Địa chỉ"
					value={formData.address}
					onChangeText={(value) => handleChange("address", value)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Ngày sinh"
					value={formData.date_of_birth}
					onChangeText={(value) =>
						handleChange("date_of_birth", value)
					}
				/>
				<TextInput
					style={styles.input}
					placeholder="Mật khẩu"
					value={formData.password}
					secureTextEntry
					onChangeText={(value) => handleChange("password", value)}
				/>

				<View style={styles.buttonContainer}>
					<Button title="Cập nhật hồ sơ" onPress={handleSubmit} />
				</View>
			</ScrollView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 10,
		width: "90%",
		borderRadius: 10,
		alignSelf: "center",
	},
	avatar: {
		width: 100,
		height: 100,
		marginBottom: 10,
		borderRadius: 50,
		alignSelf: "center",
	},
	buttonContainer: {
		marginVertical: 10,
	},
	background: {
		backgroundColor: "#ffff",
		borderRadius: 20,
		padding: 15,
	},
	margin: {
		marginTop: 10,
		marginBottom: 5,
	},
	marginBot: {
		marginBottom: 10,
	},
	name: {
		alignSelf: "center",
		fontSize: 18,
		fontWeight: "400",
	},
	colorGround: {
		backgroundColor: "#efefef",
	},
});

export default UpdateProfile;
