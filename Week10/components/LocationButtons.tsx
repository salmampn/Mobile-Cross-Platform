import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import * as Location from "expo-location";

export const LocationButtons = ({ setLocation, setErrorMsg }) => {
	const getLocation = async () => {
		const hasPermission = await hasLocationPermission();
		if (!hasPermission) {
			return;
		}

		try {
			const position = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.High,
			});
			setLocation(position.coords);
			console.log(position);
		} catch (error) {
			console.error(`Error: ${error.message}`);
			setErrorMsg("Failed to get location");
		}
	};

	const hasLocationPermission = async () => {
		if (Platform.OS === "android" && Platform.Version < 23) {
			return true;
		}

		const permissionResponse = await Location.getForegroundPermissionsAsync();

		if (permissionResponse.granted) {
			return true;
		}

		const status = await Location.requestForegroundPermissionsAsync();

		if (status.granted) {
			return true;
		}

		if (status.status === "denied") {
			console.log("Location permission denied by user.");
			setErrorMsg("Location permission denied by user.");
		} else if (!status.canAskAgain) {
			console.log("Location permission permanently denied by user.");
			setErrorMsg(
				"Location permission permanently denied. Please enable it in app settings."
			);
		}

		return false;
	};

	return (
		<TouchableOpacity
			style={styles.button}
			onPress={getLocation}
		>
			<Text style={styles.buttonText}>GET GEO LOCATION</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#2196F3",
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
});
