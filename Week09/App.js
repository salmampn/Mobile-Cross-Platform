import { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import Camera from "./components/Camera";
import Gallery from "./components/Gallery";

export default function App() {
	const [showCamera, setShowCamera] = useState(false);
	const [showGallery, setShowGallery] = useState(false);

	if (showCamera) {
		return <Camera onBack={() => setShowCamera(false)} />;
	}

	if (showGallery) {
		return <Gallery onBack={() => setShowGallery(false)} />;
	}

	return (
		<View style={styles.container}>
			<Text>Salma Manda Putri Nabilah - 0000007712</Text>
			<Text style={styles.title}>Camera App</Text>
			<View style={styles.buttonContainer}>
				<Button
					title='Open Camera'
					onPress={() => setShowCamera(true)}
					style={styles.button}
				/>
				<Button
					title='Open Gallery'
					onPress={() => setShowGallery(true)}
					style={styles.button}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "80%",
		marginTop: 20,
	},
	button: {
		marginHorizontal: 10,
	},
});
