import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Maps from "./Maps";

const Week10 = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome to the app!</Text>
			<View style={styles.mapContainer}>
				<Maps />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 18,
		marginBottom: 20,
	},
	mapContainer: {
		width: "70%",
		height: "50%",
	},
});

export default Week10;
