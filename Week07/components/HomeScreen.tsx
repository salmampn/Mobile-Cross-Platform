import React from "react";
import { Text, View, Button } from "react-native";
import styles from "./Style";

const HomeScreen = ({ navigation }) => {
	return (
		<>
			<View style={styles.container}>
				<Text>Navigation List</Text>
				<Button
					title='Email'
					onPress={() => navigation.navigate("Email")}
				/>
				<Button
					title='User List'
					onPress={() => navigation.navigate("User List")}
				/>
			</View>
		</>
	);
};

export default HomeScreen;
