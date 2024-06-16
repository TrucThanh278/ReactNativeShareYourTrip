import { StyleSheet } from "react-native";

export default StyleSheet.create({
	scrollViewContainer: {
		flexGrow: 1,
		padding: 16,
	},
	container: {
		marginBottom: 5,
	},
	commentContainer: {
		backgroundColor: "#f2f2f2",
		marginLeft: 16,
		marginTop: 20,
		flexDirection: "row",
	},
	commentContent: {
		marginLeft: 16,
	},
	commentHeader: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 4,
	},
	userInfo: {
		marginLeft: 10,
	},
	userName: {
		fontWeight: "bold",
	},
	commentText: {
		marginBottom: 10,
	},
	replyButton: {
		color: "blue",
		fontWeight: "bold",
	},
	commentDate: {
		fontSize: 12,
		color: "#888",
	},
	repliesContainer: {
		marginLeft: 50,
	},
});
