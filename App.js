import {
	PaperProvider,
	MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import Post from "./components/posts/Post";
import MyStyles from "./styles/MyStyles";
import PostDetail from "./components/posts/PostDetail";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./components/users/Profile";

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
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen name="Home" component={Post} />
			<Stack.Screen name="PostDetail" component={PostDetail} />
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
