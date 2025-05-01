import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
} from "react-native";
import { updatePost, getPostById } from "../services/axios";

const Forms = ({ route, navigation }) => {
	const { postId } = route.params;
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// Load post data when component mounts
		getPostById(postId)
			.then((res) => {
				if (res.status === 200) {
					setTitle(res.data.title);
					setBody(res.data.body);
				}
			})
			.catch((err) => {
				console.error("Error fetching post:", err);
				Alert.alert("Error", "Failed to load post data");
			});
	}, [postId]);

	const handleUpdate = () => {
		if (!title.trim() || !body.trim()) {
			Alert.alert("Validation Error", "Title and body cannot be empty");
			return;
		}

		setLoading(true);
		const data = {
			title,
			body,
			userId: 1, // Keeping the same userId
		};

		updatePost(postId, data)
			.then((res) => {
				setLoading(false);
				if (res.status === 200) {
					Alert.alert("Success", "Post updated successfully", [
						{
							text: "OK",
							onPress: () => navigation.navigate("Home"),
						},
					]);
				}
			})
			.catch((err) => {
				setLoading(false);
				console.error("Error updating post:", err);
				Alert.alert("Error", "Failed to update post");
			});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Update Post</Text>

			<View style={styles.formGroup}>
				<Text style={styles.label}>Title</Text>
				<TextInput
					style={styles.input}
					value={title}
					onChangeText={setTitle}
					placeholder='Enter post title'
				/>
			</View>

			<View style={styles.formGroup}>
				<Text style={styles.label}>Body</Text>
				<TextInput
					style={[styles.input, styles.textArea]}
					value={body}
					onChangeText={setBody}
					placeholder='Enter post body'
					multiline
					numberOfLines={5}
				/>
			</View>

			<TouchableOpacity
				style={styles.button}
				onPress={handleUpdate}
				disabled={loading}
			>
				<Text style={styles.buttonText}>
					{loading ? "Updating..." : "Update Post"}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	formGroup: {
		marginBottom: 15,
	},
	label: {
		fontSize: 16,
		marginBottom: 5,
		fontWeight: "500",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		padding: 10,
		borderRadius: 5,
		fontSize: 16,
	},
	textArea: {
		height: 120,
		textAlignVertical: "top",
	},
	button: {
		backgroundColor: "#007BFF",
		padding: 15,
		borderRadius: 5,
		alignItems: "center",
		marginTop: 20,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default Forms;
