import React, { useContext, useState } from "react";
import { View, Text, ImageBackground, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { MyDispatchContext } from "../../configs/Context";
import MyStyles from "../../styles/MyStyles";
import APIs, { endpoints, authApi } from "../../configs/APIs";
import Styles from "./Styles";

const Login = () => {
	const fields = [
		{
			label: "Tên đăng nhập",
			icon: "account",
			field: "username",
		},
		{
			label: "Mật khẩu",
			icon: "eye",
			field: "password",
			secureTextEntry: true,
		},
	];

	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const nav = useNavigation();
	const dispatch = useContext(MyDispatchContext);

	const change = (value, field) => {
		setUser((current) => {
			return { ...current, [field]: value };
		});
	};

	const login = async () => {
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("username", user.username);
			formData.append("password", user.password);
			formData.append(
				"client_id",
				"cWEKdwdbCH7oeEhsJC45Vm1PC8TidTqWgAepyril"
			);
			formData.append(
				"client_secret",
				"KbaM7exl5kDANplh66DgTludsQ9cufhMuNrxXeIPoazz0mBx205C83gCE9X1LPJAN1xOC025BZDisw9TmulfBsFpah1hBa5eS9nEldr4gu23MZmt01kmzxAl51VN41U0"
			);
			formData.append("grant_type", "password");

			let res = await APIs.post(endpoints["login"], formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			// Lưu token vào AsyncStorage
			await AsyncStorage.setItem("token", res.data.access_token);

			setTimeout(async () => {
				let user = await authApi(res.data.access_token).get(
					endpoints["current-user"]
				);
				console.info(user.data);

				dispatch({
					type: "login",
					payload: user.data,
				});

				// Chuyển hướng sang màn hình Home
				nav.navigate("Home");
			}, 100);
		} catch (ex) {
			console.error(ex);
			Alert.alert("Lỗi", "Đăng nhập thất bại");
		} finally {
			setLoading(false);
		}
	};

	return (
		<ImageBackground source={require('./assets/images/user.jpeg')} 
        style={Styles.imageBackground}
        blurRadius={5} 
        >
			<View style={[MyStyles.container, MyStyles.margin]} >
				<Text style={[Styles.titleLogin]}>
					ĐĂNG NHẬP
				</Text>
				{fields.map((f) => (
					<TextInput
						value={user[f.field]}
						onChangeText={(t) => change(t, f.field)}
						key={f.field}
						style={[MyStyles.margin, Styles.textInput]}
						label={f.label}
						secureTextEntry={f.secureTextEntry}
						right={<TextInput.Icon icon={f.icon} />}
					/>
				))}
				<Button
					loading={loading}
					icon="account"
					mode="contained"
					onPress={login}
					buttonColor="rgb(79, 133, 13)"
					style={MyStyles.button}
				>
					Đăng Nhập
				</Button>
			</View>
		</ImageBackground>	
	);
};

export default Login;
