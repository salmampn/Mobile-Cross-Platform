import { Text, View, Button } from "react-native";
import React from "react";

const Meet5_Profile = ({ navigation }) => {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Meet5_Profile</Text>
			<Button
				title='Home'
				onPress={() => navigation.navigate("Home")}
			/>
		</View>
	);
};
export default Meet5_Profile;
