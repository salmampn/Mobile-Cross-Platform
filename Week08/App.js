import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { getPosts } from "./services/axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Forms from "./screens/Forms";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchPosts = () => {
		setLoading(true);
		getPosts()
			.then((res) => {
				if (res.status === 200) {
					setPosts(res.data);
				}
			})
			.catch((err) => {
				console.error("Error fetching posts:", err);
				setError("Failed to fetch posts. Please try again.");
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchPosts();

		// Refresh posts when returning from forms screen
		const unsubscribe = navigation.addListener("focus", () => {
			fetchPosts();
		});

		return unsubscribe;
	}, [navigation]);

	const renderPostCard = ({ item }) => (
		<TouchableOpacity
			style={styles.card}
			onPress={() => navigation.navigate("Forms", { postId: item.id })}
		>
			<Text
				style={styles.cardTitle}
				numberOfLines={1}
			>
				{item.title}
			</Text>
			<Text
				style={styles.cardBody}
				numberOfLines={3}
			>
				{item.body}
			</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Salma Manda Putri Nabilah - 00000077712</Text>

			{loading ? (
				<Text style={styles.loading}>Loading posts...</Text>
			) : error ? (
				<Text style={styles.error}>{error}</Text>
			) : (
				<FlatList
					data={posts}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderPostCard}
					contentContainerStyle={styles.listContainer}
				/>
			)}
		</View>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='Home'
					component={HomeScreen}
					options={{ title: "Posts List" }}
				/>
				<Stack.Screen
					name='Forms'
					component={Forms}
					options={{ title: "Update Post" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
		paddingTop: 10,
	},
	header: {
		textAlign: "center",
		marginVertical: 10,
		fontSize: 16,
		fontWeight: "600",
	},
	listContainer: {
		padding: 16,
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 8,
		padding: 16,
		marginBottom: 16,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
		color: "#333",
	},
	cardBody: {
		fontSize: 14,
		color: "#666",
	},
	loading: {
		textAlign: "center",
		marginTop: 50,
		fontSize: 16,
	},
	error: {
		textAlign: "center",
		marginTop: 50,
		fontSize: 16,
		color: "red",
	},
});
