import { Button, Text, View } from "react-native";
import React from "react";

const Meet5_Home = ({ navigation }) => {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Meet5_Home</Text>
			<Button
				title='Profile'
				onPress={() => navigation.navigate("Profile")}
			/>
		</View>
	);
};
export default Meet5_Home;
