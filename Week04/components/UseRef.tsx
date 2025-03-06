import React from "react";
import { useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const UseRef = () => {
	const [value, setValue] = useState(0);

	const number = useRef(0);

	const handleIncrement = () => {
		number.current++;
		console.log(number.current);
	};

	const handleNumberVisibility = () => {
		setValue(number.current);
	};

	const styles = StyleSheet.create({
		btn: {
			backgroundColor: "purple",
			borderRadius: 20,
			paddingVertical: 10,
			paddingHorizontal: 20,
			justifyContent: "center",
			alignItems: "center",
			margin: 5,
			flexDirection: "row",
			gap: 5,
		},
		text: {
			color: "white",
			fontWeight: "bold",
		},
	});
	return (
		<View>
			<Text>Current Number: {number.current}</Text>
			<TouchableOpacity
				style={styles.btn}
				onPress={() => handleIncrement()}
			>
				<Ionicons
					name='add-sharp'
					size={20}
					color='white'
				/>
				<Text style={styles.text}>Increment</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.btn}
				onPress={() => handleNumberVisibility()}
			>
				<Ionicons
					name='checkmark-sharp'
					size={20}
					color='white'
				/>
				<Text style={styles.text}>Show Number</Text>
			</TouchableOpacity>
		</View>
	);
};

export default UseRef;
