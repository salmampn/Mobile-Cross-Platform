import react from "react";
import { View, Text, StyleSheet } from "react-native";

export const Latih1 = () => {
	const styles = StyleSheet.create({
		tekssaya: {
			color: "white",
			fontSize: 16,
			fontWeight: "bold",
		},
	});

	return (
		<>
			<View
				style={{
					backgroundColor: "skyblue",
					flex: 1,
					width: "100%",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text style={styles.tekssaya}>Hello ini dari latihan 1</Text>
			</View>
			<View
				style={{
					backgroundColor: "darkgreen",
					flex: 2,
					width: "100%",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text style={styles.tekssaya}>ini flex2</Text>
			</View>
			<View
				style={{
					backgroundColor: "gray",
					flex: 3,
					width: "100%",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text style={styles.tekssaya}>ini flex3</Text>
			</View>
		</>
	);
};
