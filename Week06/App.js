import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input } from "./components/Input";
import { NumberInput } from "./components/Input";

export default function App() {
	const [name, setName] = useState("");

	const handleChangeMyName = (value) => {
		setName(value);
	};

	return (
		<View style={styles.container}>
			<Text>Salma Manda Putri Nabilah - 00000077712</Text>
			<Input
				name={name}
				onChangeText={handleChangeMyName}
			/>
			<NumberInput
				name={name}
				onChangeText={handleChangeMyName}
			/>
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
