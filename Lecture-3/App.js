import { StatusBar } from "expo-status-bar";
import { Suspense, useState } from "react";
import {
	ActivityIndicator,
	Button,
	Image,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Homescreen from "./components/Homescreen";

export default function App() {
	const [showHome, setShowHome] = useState(false);
	const [showImage, setShowImage] = useState(false);

	return (
		<View style={styles.container}>
			<Button
				title={showHome ? "Sembunyikan Layar Utama" : "Tampilkan Layar Utama"}
				onPress={() => setShowHome(!showHome)}
			/>
			{showHome && (
				<Suspense fallback={<ActivityIndicator size='large' />}>
					<Homescreen />
				</Suspense>
			)}
			<Button
				title={showImage ? "Sembunyikan Gambar" : "Load Gambar"}
				onPress={() => setShowImage(!showImage)}
			/>
			{showImage && (
				<Suspense fallback={<ActivityIndicator size='large' />}>
					<Image
						style={{ width: 300, height: 300 }}
						source={require("./assets/image/bakekok.jpg")}
					/>
				</Suspense>
			)}
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
});
