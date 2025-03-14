import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input } from "./components/Input";
import { NumberInput } from "./components/Input";

export default function App() {
	const [name, setName] = useState("...");
	const [nim, setNim] = useState("...");

	const handleChangeMyName = (value) => {
		setName(value);
	};

	const handleChangeMyNim = (value) => {
		setNim(value);
	};

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: "row", gap: 10 }}>
				<Text>{name}</Text>
				<Text> - </Text>
				<Text>{nim}</Text>
			</View>

			<Input
				name={name}
				onChangeText={handleChangeMyName}
			/>
			<NumberInput
				name={nim}
				onChangeText={handleChangeMyNim}
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
