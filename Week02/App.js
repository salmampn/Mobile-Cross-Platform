import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

export default function App() {
	return (
		<>
			<ScrollView>
				<StatusBar style='auto' />
				<View style={styles.imgContainer}>
					<Image
						source={require("./assets/minji.jpg")}
						style={styles.foto}
					/>
					<Text style={styles.name}>Kim Minji</Text>
					<Text style={styles.description}>NJZ</Text>
				</View>
				<View style={styles.imgContainer}>
					<Image
						source={require("./assets/hanni.jpg")}
						style={styles.foto}
					/>
					<Text style={styles.name}>Pham Hanni</Text>
					<Text style={styles.description}>NJZ</Text>
				</View>
				<View style={styles.imgContainer}>
					<Image
						source={require("./assets/danielle.jpg")}
						style={styles.foto}
					/>
					<Text style={styles.name}>Danielle Marsh</Text>
					<Text style={styles.description}>NJZ</Text>
				</View>
				<View style={styles.imgContainer}>
					<Image
						source={require("./assets/haerin.jpg")}
						style={styles.foto}
					/>
					<Text style={styles.name}>Kang Haerin</Text>
					<Text style={styles.description}>NJZ</Text>
				</View>
				<View style={styles.imgContainer}>
					<Image
						source={require("./assets/hyein.jpg")}
						style={styles.foto}
					/>
					<Text style={styles.name}>Lee Hyein</Text>
					<Text style={styles.description}>NJZ</Text>
				</View>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	imgContainer: {
		// width: "100%",
		alignItems: "center",
		marginTop: 20,
	},
	foto: {
		borderRadius: 100,
		width: 150,
		height: 150,
		objectFit: "cover",
		borderColor: "black",
		borderWidth: 2,
	},
	name: {
		fontSize: 24,
		fontWeight: "bold",
	},
	description: {
		fontSize: 16,
		fontWeight: "normal",
	},
});
