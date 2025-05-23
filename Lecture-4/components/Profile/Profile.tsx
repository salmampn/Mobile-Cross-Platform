import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../types";

const Profile = ({ navigation }) => {
	const datauser = useSelector((state: RootState) => state.auth.user);

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<View style={styles.header}>
					<Text style={styles.title}>Profile</Text>
				</View>

				{datauser ? (
					<View style={styles.profileInfo}>
						<View style={styles.infoRow}>
							<Text style={styles.label}>Email:</Text>
							<Text style={styles.value}>{datauser.email}</Text>
						</View>

						<View style={styles.infoRow}>
							<Text style={styles.label}>User ID:</Text>
							<Text style={styles.value}>{datauser.userId}</Text>
						</View>

						<View style={styles.infoRow}>
							<Text style={styles.label}>Role:</Text>
							<Text style={styles.roleValue}>{datauser.role}</Text>
						</View>
					</View>
				) : (
					<View style={styles.notLoggedIn}>
						<Text style={styles.message}>
							Please login to view your profile
						</Text>
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
		backgroundColor: "#f5f5f5",
	},
	card: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
		width: "100%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	header: {
		alignItems: "center",
		marginBottom: 20,
	},
	avatarContainer: {
		marginBottom: 15,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderWidth: 3,
		borderColor: "#2196F3",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
	},
	profileInfo: {
		marginTop: 20,
	},
	infoRow: {
		marginVertical: 10,
	},
	label: {
		fontSize: 14,
		color: "#666",
		marginBottom: 4,
	},
	value: {
		fontSize: 18,
		fontWeight: "500",
		color: "#333",
	},
	roleValue: {
		fontSize: 18,
		fontWeight: "500",
		color: "#2196F3",
		textTransform: "capitalize",
	},
	notLoggedIn: {
		alignItems: "center",
		marginTop: 20,
	},
	message: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
	},
});

export default Profile;
