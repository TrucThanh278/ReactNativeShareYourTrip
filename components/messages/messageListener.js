// Initialize Firebase
const db = firebase.firestore();

function listenForMessages(chatId) {
	db.collection("chats")
		.doc(chatId)
		.collection("messages")
		.orderBy("timestamp")
		.onSnapshot((snapshot) => {
			snapshot.docChanges().forEach((change) => {
				if (change.type === "added") {
					const message = change.doc.data();
					displayMessage(message);
				}
			});
		});
}

function displayMessage(message) {
	const messageElement = document.createElement("div");
	messageElement.textContent = `${message.senderId}: ${message.text}`;
	document.getElementById("messages").appendChild(messageElement);
}

// Example usage
listenForMessages("chatId");
