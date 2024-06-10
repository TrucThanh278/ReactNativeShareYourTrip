import React, { useReducer, useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Profile from "./components/users/Profile";
import UpdateProfile from "./components/users/UpdateProfile";
import Logout from "./components/users/Logout";
import MyUserReducer from "./reducers/MyUserReducers";
import { MyUserContext, MyDispatchContext } from "./configs/Context";
import Post from "./components/posts/Post";
import ProfileUser from "./components/users/ProfileUser";
import ProfileNavigator from "./components/users/ProfileNavigator";
import CreatePost from "./components/posts/CreatePost";
import AddImage from "./components/posts/AddImage";
import CreateHashtagPost from "./components/posts/CreateHashtagPost";
import RatingDetail from "./components/users/RatingDetail";
import {
	PaperProvider,
	MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import MyStyles from "./styles/MyStyles";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const theme = {
	...DefaultTheme,
	myOwnProperty: true,
	colors: {
		// ...MyStyles.lightTheme.colors,
		primary: "rgb(42, 107, 41)",
		onPrimary: "rgb(255, 255, 255)",
		primaryContainer: "rgb(172, 244, 161)",
		onPrimaryContainer: "rgb(0, 34, 2)",
		secondary: "rgb(83, 99, 78)",
		onSecondary: "rgb(255, 255, 255)",
		secondaryContainer: "rgb(214, 232, 206)",
		onSecondaryContainer: "rgb(17, 31, 15)",
		tertiary: "rgb(56, 101, 106)",
		onTertiary: "rgb(255, 255, 255)",
		tertiaryContainer: "rgb(188, 235, 240)",
		onTertiaryContainer: "rgb(0, 32, 34)",
		error: "rgb(186, 26, 26)",
		onError: "rgb(255, 255, 255)",
		errorContainer: "rgb(255, 218, 214)",
		onErrorContainer: "rgb(65, 0, 2)",
		background: "rgb(252, 253, 246)",
		onBackground: "rgb(26, 28, 25)",
		surface: "rgb(252, 253, 246)",
		onSurface: "rgb(26, 28, 25)",
		surfaceVariant: "rgb(222, 228, 216)",
		onSurfaceVariant: "rgb(66, 73, 63)",
		outline: "rgb(115, 121, 111)",
		outlineVariant: "rgb(194, 200, 188)",
		shadow: "rgb(0, 0, 0)",
		scrim: "rgb(0, 0, 0)",
		inverseSurface: "rgb(47, 49, 45)",
		inverseOnSurface: "rgb(241, 241, 235)",
		inversePrimary: "rgb(145, 216, 136)",
		elevation: {
			level0: "transparent",
			level1: "rgb(242, 246, 236)",
			level2: "rgb(235, 241, 230)",
			level3: "rgb(229, 237, 223)",
			level4: "rgb(227, 236, 221)",
			level5: "rgb(223, 233, 217)",
		},
		surfaceDisabled: "rgba(26, 28, 25, 0.12)",
		onSurfaceDisabled: "rgba(26, 28, 25, 0.38)",
		backdrop: "rgba(44, 50, 42, 0.4)",
	},
};

const ProfileStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Profile"
				component={Profile}
				options={{ title: "My Profile" }}
			/>
			<Stack.Screen
				name="UpdateProfile"
				component={UpdateProfile}
				options={{ title: "Update Profile" }}
			/>
		</Stack.Navigator>
	);
};

const HomeStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={Post}
				options={{ title: "Home" }}
			/>
			<Stack.Screen
				name="ProfileNavigator"
				component={ProfileNavigator}
				options={{ title: "Profile" }}
			/>
			<Stack.Screen
				name="CreatePost"
				component={CreatePost}
				options={{ title: "Create Post" }}
			/>
			<Stack.Screen
				name="AddImage"
				component={AddImage}
				options={{ title: "Image Post" }}
			/>
			<Stack.Screen
				name="CreateHashtagPost"
				component={CreateHashtagPostScreen}
				options={{ title: "Create Hashtag Post" }}
			/>
			<Stack.Screen name="RatingDetail" component={RatingDetail} />
		</Stack.Navigator>
	);
};

const CreateHashtagPostScreen = () => {
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<CreateHashtagPost />
		</View>
	);
};

const MyTab = () => {
	const user = useContext(MyUserContext);

	return (
		<Tab.Navigator>
			<Tab.Screen
				name="HomeStack"
				component={HomeStack}
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="home"
							color={color}
							size={size}
						/>
					),
				}}
			/>
			{user ? (
				<>
					<Tab.Screen
						name="ProfileStack"
						component={ProfileStack}
						options={{
							title: user.username,
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons
									name="account"
									color={color}
									size={size}
								/>
							),
						}}
					/>
					<Tab.Screen
						name="Logout"
						component={Logout}
						options={{
							tabBarButton: () => null,
						}}
					/>
				</>
			) : (
				<>
					<Tab.Screen
						name="Register"
						component={Register}
						options={{
							title: "REGISTER",
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons
									name="account"
									color={color}
									size={size}
								/>
							),
						}}
					/>
					<Tab.Screen
						name="Login"
						component={Login}
						options={{
							title: "LOGIN",
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons
									name="login"
									color={color}
									size={size}
								/>
							),
						}}
					/>
				</>
			)}
		</Tab.Navigator>
	);
};

const App = () => {
	const [user, dispatch] = useReducer(MyUserReducer, null);

	return (
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<MyUserContext.Provider value={user}>
					<MyDispatchContext.Provider value={dispatch}>
						<MyTab />
					</MyDispatchContext.Provider>
				</MyUserContext.Provider>
			</NavigationContainer>
		</PaperProvider>
	);
};

export default App;
