import React from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../authSlice";
import { RootState } from "../types";

const Home = ({ navigation }) => {
	const dispatch = useDispatch();
	const dataUser = useSelector((state: RootState) => state.auth.user);

	const klikBtnLogin = () => {
		dispatch(login({ userId: "123", email: "test@email.com", role: "admin" }));
	};
	const klikBtnLogout = () => {
		dispatch(logout());
	};

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Text style={styles.title}>Welcome to App</Text>

				{dataUser ? (
					<View style={styles.userInfo}>
						<Text style={styles.label}>Email:</Text>
						<Text style={styles.value}>{dataUser.email}</Text>
						<Text style={styles.label}>Role:</Text>
						<Text style={styles.value}>{dataUser.role}</Text>
					</View>
				) : (
					<Text style={styles.message}>Belum Login</Text>
				)}
			</View>

			<View style={styles.buttonContainer}>
				{!dataUser ? (
					<TouchableOpacity
						style={[styles.button, styles.loginButton]}
						onPress={klikBtnLogin}
					>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						style={[styles.button, styles.logoutButton]}
						onPress={klikBtnLogout}
					>
						<Text style={styles.buttonText}>Logout</Text>
					</TouchableOpacity>
				)}
				<TouchableOpacity
					style={[styles.button, styles.profileButton]}
					onPress={() => navigation.navigate("Profile")}
				>
					<Text style={styles.buttonText}>Go to Profile</Text>
				</TouchableOpacity>
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
		marginBottom: 20,
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 20,
		textAlign: "center",
	},
	userInfo: {
		marginTop: 10,
	},
	label: {
		fontSize: 14,
		color: "#666",
		marginTop: 10,
	},
	value: {
		fontSize: 16,
		fontWeight: "500",
		color: "#333",
		marginBottom: 6,
	},
	message: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		marginTop: 10,
	},
	buttonContainer: {
		width: "100%",
		marginTop: 10,
	},
	button: {
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 20,
		alignItems: "center",
		marginVertical: 8,
		width: "100%",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	loginButton: {
		backgroundColor: "#4CAF50",
	},
	logoutButton: {
		backgroundColor: "#f44336",
	},
	profileButton: {
		backgroundColor: "#2196F3",
	},
});

export default Home;
