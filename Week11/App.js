import { StatusBar } from "expo-status-bar";
import { addDoc, collection } from "firebase/firestore";
import { app, db } from "./FirebaseConfig";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function App() {
	const addData = async () => {
		try {
			const docRef = addDoc(collection(db, "users"), {
				first: "Ada",
				last: "Lovelace",
				born: 1815,
			});
			if (Platform.OS === "android") {
				console.log("Document written from phone with ID: ", docRef.id);
			} else {
				console.log("Document written with ID: ", docRef.id);
			}
		} catch (err) {
			console.error("Error adding document: ", err);
		}
	};

	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!</Text>
			<StatusBar style='auto' />
			<Text
				onPress={addData}
				style={{
					marginTop: 20,
					fontSize: 20,
					color: "blue",
					textDecorationLine: "underline",
				}}
			>
				Add Data
			</Text>
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
