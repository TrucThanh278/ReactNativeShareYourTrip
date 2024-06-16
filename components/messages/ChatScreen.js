import React, { useState, useEffect } from "react";
import {
	View,
	TextInput,
	Button,
	FlatList,
	Text,
	StyleSheet,
} from "react-native";
import { auth, firestore } from "./firebaseConfig";

const ChatScreen = () => {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");

	useEffect(() => {
		const unsubscribe = firestore
			.collection("messages")
			.orderBy("timestamp", "asc")
			.onSnapshot((snapshot) => {
				const messages = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setMessages(messages);
			});

		return () => unsubscribe();
	}, []);

	const handleSend = () => {
		firestore.collection("messages").add({
			text: newMessage,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			user: auth.currentUser.email,
		});
		setNewMessage("");
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={messages}
				renderItem={({ item }) => (
					<View style={styles.message}>
						<Text>
							{item.user}: {item.text}
						</Text>
					</View>
				)}
				keyExtractor={(item) => item.id}
			/>
			<TextInput
				style={styles.input}
				placeholder="Type a message"
				onChangeText={setNewMessage}
				value={newMessage}
			/>
			<Button title="Send" onPress={handleSend} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	message: {
		padding: 8,
		borderBottomColor: "gray",
		borderBottomWidth: 1,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 12,
		padding: 8,
	},
});

export default ChatScreen;
