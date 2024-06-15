// // import { StyleSheet } from "react-native";

// // export default StyleSheet.create({
// // 	scrollViewContainer: {
// // 		flexGrow: 1,
// // 		marginTop: 16,
// // 		marginLeft: 16,
// // 		backgroundColor: "#f2f2f2",
// // 	},
// // 	container: {
// // 		margin: 0,
// // 	},
// // 	commentContainer: {
// // 		backgroundColor: "#f2f2f2",
// // 	},
// // 	commentContent: {
// // 		padding: 1,
// // 	},
// // 	commentHeader: {
// // 		flexDirection: "row",
// // 		alignItems: "flex-start",
// // 		marginBottom: 4,
// // 	},
// // 	userInfo: {
// // 		marginLeft: 10,
// // 	},
// // 	userName: {
// // 		fontWeight: "bold",
// // 	},
// // 	commentText: {
// // 		marginLeft: 45,
// // 		marginBottom: 10,
// // 	},
// // 	replyButton: {
// // 		marginLeft: 45,
// // 		color: "blue",
// // 		fontWeight: "bold",
// // 		width: 100,
// // 		display: "inline-block",
// // 	},
// // 	commentDate: {
// // 		fontSize: 12,
// // 		color: "#888",
// // 	},
// // 	repliesContainer: {
// // 		marginLeft: 25,
// // 	},
// // });

// import { StyleSheet } from "react-native";

// export default StyleSheet.create({
// 	scrollViewContainer: {
// 		flexGrow: 1,
// 		padding: 16,
// 	},
// 	container: {
// 		margin: 0,
// 	},
// 	commentContainer: {
// 		flexDirection: "row",
// 		marginBottom: 10,
// 	},
// 	commentContent: {
// 		flex: 1,
// 		marginLeft: 10,
// 	},
// 	userName: {
// 		fontWeight: "bold",
// 	},
// 	commentDate: {
// 		color: "gray",
// 		fontSize: 12,
// 	},
// 	replyButton: {
// 		color: "blue",
// 	},
// 	repliesContainer: {
// 		marginLeft: 20,
// 	},
// });

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
