import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { LocationButtons } from "./components/LocationButtons";
import { LocationDisplay } from "./components/LocationDisplay";

export default function App() {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [filePath, setFilePath] = useState(null);

	return (
		<View style={styles.container}>
			<Text style={styles.nameText}>
				Salma Manda Putri Nabilah - 00000077712
			</Text>

			<LocationButtons
				setLocation={setLocation}
				setErrorMsg={setErrorMsg}
			/>

			{location ? (
				<LocationDisplay
					location={location}
					setFilePath={setFilePath}
					filePath={filePath}
				/>
			) : (
				<Text style={styles.infoText}>
					{errorMsg || "Press the button to get location"}
				</Text>
			)}
			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	nameText: {
		fontSize: 16,
		marginBottom: 20,
		fontWeight: "bold",
	},
	infoText: {
		marginTop: 10,
		color: "#666",
	},
});
