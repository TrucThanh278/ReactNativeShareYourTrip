import React, { useContext } from "react";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyDispatchContext } from "../../configs/Context";
import axios from "axios";
import { authApi, endpoints } from '../../configs/APIs';

const Logout = ({ navigation }) => {
	const dispatch = useContext(MyDispatchContext);

	const logout = async () => {
		try {
			const token = await AsyncStorage.getItem("token");

			if (token) {
				await authApi(token).delete(endpoints.deleteUser);
			}

			await AsyncStorage.removeItem("token");
			console.log("Token removed successfully from AsyncStorage");

			dispatch({ type: "logout" });

			navigation.navigate("Login");
		} catch (e) {
			console.error(
				"Failed to remove the user token or logout from backend.",
				e
			);
		}
	};

	return (
		<Button icon="logout" mode="contained" onPress={logout}>
			Thoát
		</Button>
	);
};

export default Logout;
