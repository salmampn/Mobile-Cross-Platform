import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		// paddingHorizontal: 16,
		// marginTop: 20,
		alignItems: "center",
	},
	card: {
		width: "85%",
		borderRadius: 12,
		elevation: 3,
		backgroundColor: "#ffffff",
		paddingHorizontal: 16,
		paddingVertical: 20,
		marginBottom: 12,
	},
	cardContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	avatar: {
		marginRight: 16,
	},
	textContainer: {
		flex: 1,
	},
	name: {
		fontWeight: "bold",
		fontSize: 18,
	},
	divider: {
		width: "100%",
		height: 1,
		backgroundColor: "#007bff",
		marginVertical: 4,
	},
	email: {
		color: "#555",
	},
});

export default styles;
