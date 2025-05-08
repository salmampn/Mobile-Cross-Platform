import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import * as FileSystem from "expo-file-system";

let Sharing = null;
try {
	Sharing = require("expo-sharing");
} catch (e) {
	console.log("expo-sharing not available, file sharing will be limited");
}

export const LocationDisplay = ({ location, setFilePath, filePath }) => {
	const saveLocationToFile = async () => {
		if (!location) {
			Alert.alert("Error", "No location data to save.");
			return;
		}

		try {
			// Create content for the file
			const timestamp = new Date().toISOString();
			const content =
				`Location Data - ${timestamp}\n` +
				`Longitude: ${location.longitude}\n` +
				`Latitude: ${location.latitude}\n` +
				`Altitude: ${location.altitude || "N/A"}\n` +
				`Accuracy: ${location.accuracy} meters\n`;

			// Define file path in the app's document directory
			const path = `${FileSystem.documentDirectory}location_${Date.now()}.txt`;

			// Write file
			await FileSystem.writeAsStringAsync(path, content);
			setFilePath(path);

			// Check if sharing is available
			if (Sharing && (await Sharing.isAvailableAsync())) {
				// If sharing is available, share the file
				await Sharing.shareAsync(path);
				Alert.alert("Success", "Location data saved and ready to share");
			} else {
				// If sharing is not available, use alternative method
				Alert.alert(
					"Success",
					`Location data saved to app's document directory at: ${path}`
				);
			}
		} catch (error) {
			console.error("Error saving file:", error);
			Alert.alert("Error", "Failed to save location data.");
		}
	};

	return (
		<View style={styles.locationContainer}>
			<Text style={styles.locationText}>
				Longitude: {location.longitude.toFixed(7)}
			</Text>
			<Text style={styles.locationText}>
				Latitude: {location.latitude.toFixed(7)}
			</Text>

			<TouchableOpacity
				style={styles.saveButton}
				onPress={saveLocationToFile}
			>
				<Text style={styles.buttonText}>SAVE TO FILE</Text>
			</TouchableOpacity>

			{filePath && (
				<Text style={styles.filePathText}>Saved to: {filePath}</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	locationContainer: {
		marginTop: 10,
		alignItems: "center",
	},
	locationText: {
		fontSize: 16,
		marginVertical: 2,
	},
	saveButton: {
		backgroundColor: "#4CAF50",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		marginVertical: 15,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	filePathText: {
		fontSize: 12,
		color: "#666",
		marginTop: 10,
		textAlign: "center",
	},
});
