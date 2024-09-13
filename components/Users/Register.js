import React, { useState } from "react";
import {
	View,
	Text,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	Alert,
	Image,
	ImageBackground,
} from "react-native";
import {
	Button,
	HelperText,
	TextInput,
	TouchableRipple,
	RadioButton,
} from "react-native-paper";
import MyStyles from "../../styles/MyStyles";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Styles from "./Styles";
import {
	auth,
	createUserWithEmailAndPassword,
} from "../../firebase/firebaseConfig";

import { authApi, endpoints } from "../../configs/APIs";

const Register = () => {
	const fields = [
		{ label: "Tên", icon: "text", field: "first_name" },
		{ label: "Họ và tên đệm", icon: "text", field: "last_name" },
		{ label: "Email", icon: "email", field: "email" },
		{ label: "Số điện thoại", icon: "phone", field: "phone_number" },
		{ label: "Tên đăng nhập", icon: "account", field: "username" },
		{
			label: "Mật khẩu",
			icon: "eye",
			field: "password",
			secureTextEntry: true,
		},
		{
			label: "Xác nhận mật khẩu",
			icon: "eye",
			field: "confirm",
			secureTextEntry: true,
		},
	];

	const [user, setUser] = useState({ gender: "men" });
	const [err, setErr] = useState(false);
	const [loading, setLoading] = useState(false);
	const nav = useNavigation();

	const change = (value, field) => {
		setUser((current) => ({ ...current, [field]: value }));
	};

	const picker = async () => {
		let { status } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted")
			Alert.alert("iCourseApp", "Permissions Denied!");
		else {
			let res = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});
			if (!res.canceled) change(res.assets[0], "avatar");
		}
	};

	const register = async () => {
		if (user.password !== user.confirm) {
			setErr(true);
		} else {
			setErr(false);
			let form = new FormData();
			for (let k in user) {
				if (k !== "confirm") {
					if (k === "avatar") {
						form.append(k, {
							uri: user.avatar.uri,
							name: user.avatar.uri.split("/").pop(),
							type: "image/jpeg",
						});
					} else {
						form.append(k, user[k]);
					}
				}
			}

			setLoading(true);

			try {
				const response = await authApi().post(
					endpoints.register,
					form,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				);

				if (response.status === 201) {
					console.log(response.data);

					const firebaseEmail = user.email;
					const firebasePassword = user.password;

					await createUserWithEmailAndPassword(
						auth,
						firebaseEmail,
						firebasePassword
					);

					nav.navigate("Login");
				} else {
					throw new Error(
						response.data.message ||
						"Registration failed. Please try again."
					);
				}
			} catch (ex) {
				console.error("API Error: ", ex);
				console.log("Response from server:", ex.response);

				if (
					ex.response &&
					ex.response.data &&
					ex.response.data.message
				) {
					Alert.alert("Lỗi đăng ký", ex.response.data.message);
				} else {
					Alert.alert(
						"Lỗi đăng ký",
						"Đăng ký thất bại, vui lòng thử lại !!!"
					);
				}
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<ImageBackground
			source={require("./assets/images/user.jpeg")}
			style={Styles.imageBackground}
			blurRadius={5}
		>
			<View style={[MyStyles.container, MyStyles.margin]}>
				<ScrollView>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
					>
						<Text style={[Styles.titleLogin]}>
							ĐĂNG KÝ THÀNH VIÊN
						</Text>
						{fields.map((f) => (
							<TextInput
								value={user[f.field]}
								onChangeText={(t) => change(t, f.field)}
								key={f.field}
								style={MyStyles.margin}
								label={f.label}
								secureTextEntry={f.secureTextEntry}
								right={<TextInput.Icon icon={f.icon} />}
							/>
						))}

						<RadioButton.Group
							onValueChange={(value) => change(value, "gender")}
							value={user.gender}
							color="white"
						>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "center",
								}}
							>
								<View
									style={[
										MyStyles.radioContainer,
										{ marginRight: 50 },
									]}
								>
									<RadioButton
										value="men"
										uncheckedColor="rgba(255, 255, 255, 0.5)"
										color="white"
									/>
									<Text style={{ color: "white" }}>Nam</Text>
								</View>
								<View
									style={[
										MyStyles.radioContainer,
										{ marginRight: 50 },
									]}
								>
									<RadioButton
										value="women"
										uncheckedColor="rgba(255, 255, 255, 0.5)"
										color="white"
									/>
									<Text style={{ color: "white" }}>Nữ</Text>
								</View>
								<View style={MyStyles.radioContainer}>
									<RadioButton
										value="others"
										uncheckedColor="rgba(255, 255, 255, 0.5)"
										color="white"
									/>
									<Text style={{ color: "white" }}>Khác</Text>
								</View>
							</View>
						</RadioButton.Group>

						<TouchableRipple onPress={picker}>
							<Text
								style={[
									MyStyles.margin,
									{ color: "white", marginTop: 20 },
								]}
							>
								Chọn hình đại diện...
							</Text>
						</TouchableRipple>

						<HelperText type="error" visible={err}>
							Mật khẩu xác nhận sai!
						</HelperText>

						{user.avatar && (
							<Image
								source={{ uri: user.avatar.uri }}
								style={MyStyles.avatar}
							/>
						)}

						<Button
							loading={loading}
							icon="account"
							mode="contained"
							onPress={register}
							buttonColor="rgb(79, 133, 13)"
							style={MyStyles.button}
						>
							Đăng Ký
						</Button>
					</KeyboardAvoidingView>
				</ScrollView>
			</View>
		</ImageBackground>
	);
};

export default Register;
