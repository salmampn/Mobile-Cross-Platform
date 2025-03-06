import React from "react";
// import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import userData from "./data.json";
import styles from "./Style";
// import Header from "./components/Header";
// import CustomCard from "./components/CustomCard";
// import UseRef from "./components/UseRef";

export default function App() {
	const users = userData.users;
	return (
		// <View style={styles.container}>
		// 	<Text>Open up App.js to start working on your app!</Text>
		// 	<StatusBar style='auto' />
		// 	<Header />
		// 	<CustomCard
		// 		backgroundColor={"lightblue"}
		// 		title='Card 1'
		// 		content='This is the content of Card 1. Customize as needed. You can go further on'
		// 	/>
		// 	<CustomCard
		// 		backgroundColor={"lightgreen"}
		// 		title='Card 2'
		// 		content='This is the content of Card 2. Customize as needed. You can go further on'
		// 	/>
		// 	<UseRef />
		// </View>
		<ScrollView style={{ marginTop: 30 }}>
			{users.map((user) => {
				return (
					<View
						style={styles.container}
						key={user.name}
					>
						<View style={styles.card}>
							<Image
								source={{ uri: user.photo_url }}
								style={styles.avatar}
							/>
							<View style={styles.boldText}>
								<Text style={styles.boldText}>{user.name}</Text>
								<Text>{user.email}</Text>
							</View>
						</View>
					</View>
				);
			})}
		</ScrollView>
	);
}
