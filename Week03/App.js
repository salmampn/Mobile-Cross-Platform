import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Counter from "./components/Counter";
import Profile from "./components/Profile";

export default function App() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("");
	const [passedName, setPassedName] = useState("");
	const [passedCount, setPassedCount] = useState(0);
	const [showProfile, setShowProfile] = useState(false);

	const handleIncrement = () => {
		setCount(count + 1);
	};

	const handleDecrement = () => {
		setCount(count - 1);
	};

	const handleReset = () => {
		setCount(0);
	};

	const handlePassData = () => {
		setPassedName(name.trim() === "" ? "Anonymous" : name);
		setPassedCount(count);
		setShowProfile(true);
	};

	return (
		<View style={styles.container}>
			<StatusBar style='auto' />
			{showProfile && (
				<Profile
					name={passedName}
					count={passedCount}
				/>
			)}
			<Counter
				value={count}
				handleIncrement={handleIncrement}
				handleDecrement={handleDecrement}
				handleReset={handleReset}
				handlePassData={handlePassData}
			/>
			<TextInput
				style={styles.input}
				placeholder='Input your name here'
				value={name}
				onChangeText={setName} // Fixed here
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
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		width: 200,
		textAlign: "center",
	},
});
