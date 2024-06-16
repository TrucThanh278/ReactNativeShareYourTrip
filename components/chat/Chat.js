import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Alert,
	Image,
	StyleSheet,
	TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Import modular Firestore functions
import { auth, db } from "../../firebase/firebaseConfig"; // Adjust the path based on your project structure
import Icon from "react-native-vector-icons/FontAwesome"; // Ensure the correct import for FontAwesome

const defaultAvatar =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s"; // Path to default avatar image

const Chat = () => {
	const [users, setUsers] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const navigation = useNavigation();
	const currentUser = auth.currentUser;

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const firestore = getFirestore();
				const usersCollectionRef = collection(firestore, "users");
				const querySnapshot = await getDocs(usersCollectionRef);
				const userList = querySnapshot.docs
					.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
					.filter((user) => user.id !== currentUser.uid); // Filter out the current user from the list

				console.log("User List:", userList);
				setUsers(userList);
			} catch (error) {
				console.error("Error fetching users from Firestore:", error);
				Alert.alert("Error", "Failed to fetch users.");
			}
		};

		fetchUsers();
	}, [currentUser]); // Add `currentUser` to the dependency array to rerun useEffect when it changes

	const handleChat = (user) => {
		navigation.navigate("ChatDetail", { user });
	};

	const handleSearch = (text) => {
		setSearchQuery(text);
	};

	// Filter the user list based on search query
	const filteredUsers = users.filter(
		(user) =>
			user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Function to render avatar or default avatar if none is provided
	const renderAvatar = (item) => {
		if (item.avatar) {
			return (
				<Image source={{ uri: item.avatar }} style={styles.avatar} />
			);
		} else {
			return (
				<Image source={{ uri: defaultAvatar }} style={styles.avatar} />
			);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Danh sách bạn bè</Text>
			<View style={styles.searchContainer}>
				<Icon
					name="search"
					size={20}
					color="#666"
					style={styles.searchIcon}
				/>
				<TextInput
					style={styles.searchInput}
					placeholder="Tìm kiếm bằng tên hoặc email..."
					value={searchQuery}
					onChangeText={handleSearch}
				/>
			</View>
			<FlatList
				data={filteredUsers}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => handleChat(item)}
						style={styles.userItem}
					>
						{renderAvatar(item)}
						<View style={styles.userInfo}>
							<Text style={styles.username}>{item.username}</Text>
							<Text style={styles.email}>{item.email}</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
	},
	searchIcon: {
		marginRight: 10,
	},
	searchInput: {
		flex: 1,
		height: 40,
		paddingVertical: 0,
		paddingHorizontal: 5,
		fontSize: 16,
	},
	userItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 10,
	},
	userInfo: {
		flex: 1,
	},
	username: {
		fontSize: 18,
		fontWeight: "bold",
	},
	email: {
		fontSize: 14,
		color: "#666",
	},
});

export default Chat;
