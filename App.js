import React, { useReducer, useContext, useEffect } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";
import Profile from "./components/Users/Profile";
import UpdateProfile from "./components/Users/UpdateProfile";
import Logout from "./components/Users/Logout";
import MyUserReducer from "./reducers/MyUserReducers";
import { MyUserContext, MyDispatchContext } from "./configs/Context";
import Post from "./components/posts/Post";
import ProfileNavigator from "./components/Users/ProfileNavigator";
import CreatePost from "./components/posts/CreatePost";
import AddImage from "./components/posts/AddImage";
import CreateHashtagPost from "./components/posts/CreateHashtagPost";
import RatingDetail from "./components/Users/RatingDetail";
import AdminHome from "./components/admin/AdminHome";
import ManageReports from "./components/admin/ManageReports";
import PostDetail from "./components/posts/PostDetail";
import Chat from "./components/chat/Chat";
import ChatDetail from "./components/chat/ChatDetail";
import { Provider as PaperProvider, DefaultTheme as DefaultPaperTheme } from "react-native-paper";



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const theme = {
	...DefaultPaperTheme,
	colors: {
		...DefaultPaperTheme.colors,
		// Define your custom colors here
	},
};

// Stack Navigator for user screens
const ProfileStack = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="UserProfile"
			component={Profile}
			options={{ title: "Hồ Sơ Của Tôi", headerShown: false }}
		/>
		<Stack.Screen
			name="UpdateProfile"
			component={UpdateProfile}
			options={{ title: "Cập Nhật Hồ Sơ" }}
		/>
	</Stack.Navigator>
);

// Stack Navigator for main screens
const HomeStack = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="HomeScreen"
			component={Post}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="ProfileNavigator"
			component={ProfileNavigator}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="CreatePost"
			component={CreatePost}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="AddImage"
			component={AddImage}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="CreateHashtagPost"
			component={CreateHashtagPostScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen name="RatingDetail" component={RatingDetail} />
		<Stack.Screen name="PostDetail" component={PostDetail} />
		<Stack.Screen name="ChatDetail" component={ChatDetail} options={{ title: "Chi Tiết Chat" }} />
	</Stack.Navigator>
);

// Stack Navigator for admin screens
const AdminProfileStack = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="AdminProfile"
			component={AdminHome}
			options={{ title: "Hồ Sơ Admin" }}
		/>
		<Stack.Screen
			name="UpdateProfile"
			component={UpdateProfile}
			options={{ title: "Cập Nhật Hồ Sơ" }}
		/>
	</Stack.Navigator>
);

const ManageReportsStack = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="Manage"
			component={ManageReports}
			options={{ title: "Quản Lý Báo Cáo" }}
		/>
	</Stack.Navigator>
);

const CreateHashtagPostScreen = () => (
	<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
		<CreateHashtagPost />
	</View>
);

const MyTab = () => {
	const user = useContext(MyUserContext);
	const role = user?.role || "guest";

	useEffect(() => {
		console.log("LOG role:", role);
	}, [role]);

	const initialRouteName = role === "admin" ? "AdminProfileTab" : "Home";

	return (
		<Tab.Navigator initialRouteName={initialRouteName}>
			{role === "admin" ? (
				<>
					<Tab.Screen
						name="AdminProfileTab"
						component={AdminProfileStack}
						options={{
							title: "Hồ Sơ Admin",
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons
									name="shield-account"
									color={color}
									size={size}
								/>
							),
						}}
					/>
					<Tab.Screen
						name="ManageReports"
						component={ManageReportsStack}
						options={{
							title: "Quản Lý Báo Cáo",
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons
									name="file-chart-outline"
									color={color}
									size={size}
								/>
							),
						}}
					/>
					<Tab.Screen
						name="AdminLogout"
						component={Logout}
						options={{
							tabBarButton: () => null,
						}}
					/>
					{/* Add the HomeStack for admin */}
					<Tab.Screen
						name="Home"
						component={HomeStack}
						options={{
							title: "Trang Chủ",
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons
									name="home"
									color={color}
									size={size}
								/>
							),
						}}
					/>
				</>
			) : (
				<>
					<Tab.Screen
						name="Home"
						component={HomeStack}
						options={{
							title: "Trang Chủ",
							headerShown: false,
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons
									name="home"
									color={color}
									size={size}
								/>
							),
						}}
					/>
					{user != null ? (
						<>
							<Tab.Screen
								name="Profile"
								component={ProfileStack}
								options={{
									title:
										user?.first_name +
										" " +
										user?.last_name || "Tài khoản",
									headerShown: false,
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
								name="Chat"
								component={Chat}
								options={{
									title: "Nhắn tin",
									tabBarIcon: ({ color, size }) => (
										<MaterialCommunityIcons name="chat" color={color} size={size} />
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
									title: "ĐĂNG KÝ",
									headerShown: false,
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
									title: "ĐĂNG NHẬP",
									headerShown: false,
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
				</>
			)}
		</Tab.Navigator>
	);
};

const App = () => {
	const [user, dispatch] = useReducer(MyUserReducer, null);

	useEffect(() => {
		const loginUser = {
			username: "adminUser",
			role: "admin",
		};
		dispatch({ type: "LOGIN", payload: loginUser });
	}, []);

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
