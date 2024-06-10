import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f9f9f9",
	},
	headerTitle: {
		flex: 1,
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
	},
	profileContainer: {
		flexDirection: "row",
		padding: 20,
		alignItems: "center",
	},
	avatar: {
		marginRight: 20,
	},
	profileDetails: {
		flex: 1,
	},
	name: {
		fontSize: 24,
		fontWeight: "bold",
	},
	followText: {
		marginVertical: 5,
	},
	followButton: {
		marginTop: 10,
	},
	collections: {
		padding: 20,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	stats: {
		padding: 20,
	},
	statItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 10,
	},
	statLabel: {
		fontSize: 18,
	},
	statValue: {
		fontSize: 18,
		color: "#888",
	},
});
