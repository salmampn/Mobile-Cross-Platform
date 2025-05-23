import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
	Avatar,
	Text,
	Provider as PaperProvider,
	Divider,
} from "react-native-paper";
import Animated, { FadeInUp } from "react-native-reanimated";
import userData from "../data.json";
import styles from "./Style";

const UserList = ({ navigation }) => {
	const users = userData.users;

	return (
		<PaperProvider>
			<ScrollView contentContainerStyle={styles.container}>
				{users.map((user, index) => (
					<Animated.View
						key={user.name}
						style={styles.card}
						entering={FadeInUp.delay(index * 200).duration(500)} // Tambahkan delay berdasarkan index
					>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("Profile", {
									userName: user.name,
									email: user.email,
									photo_url: user.photo_url,
								})
							}
						>
							<View style={styles.cardContent}>
								<Avatar.Image
									size={100}
									source={{ uri: user.photo_url }}
									style={styles.avatar}
								/>
								<View style={styles.textContainer}>
									<Text
										variant='titleMedium'
										style={styles.name}
									>
										{user.name}
									</Text>
									<Divider style={styles.divider} />
									<Text
										variant='bodyMedium'
										style={styles.email}
									>
										{user.email}
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					</Animated.View>
				))}
			</ScrollView>
		</PaperProvider>
	);
};

export default UserList;
