import {
	PaperProvider,
	MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import Post from "./components/posts/Post";
import MyStyles from "./styles/MyStyles";
import PostDetail from "./components/posts/PostDetail";
import Comments from "./components/comments/Comments";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./components/users/Profile";
import PostInfo from "./components/utils/PostInfo";

const theme = {
	...DefaultTheme,
	myOwnProperty: true,
	colors: {
		...MyStyles.lightTheme.colors,
	},
};

const Stack = createStackNavigator();

const MyStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: true }}>
			<Stack.Screen name="Home" component={Post} />
			<Stack.Screen name="Comments" component={Comments} />
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen name="PostDetail" component={PostDetail} />
			<Stack.Screen name="PostInfo" component={PostInfo} />
		</Stack.Navigator>
	);
};

export default function App() {
	return (
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<MyStack />
			</NavigationContainer>
		</PaperProvider>
	);
}
