import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	Image,
	FlatList,
	TouchableOpacity,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";

export default function Gallery({ onBack }) {
	const [photos, setPhotos] = useState([]);
	const [hasPermission, setHasPermission] = useState(null);

	useEffect(() => {
		(async () => {
			const { status } = await MediaLibrary.requestPermissionsAsync();
			setHasPermission(status === "granted");

			if (status === "granted") {
				loadPhotos();
			}
		})();
	}, []);

	const loadPhotos = async () => {
		try {
			const { assets } = await MediaLibrary.getAssetsAsync({
				mediaType: "photo",
				first: 20,
				sortBy: [MediaLibrary.SortBy.creationTime],
			});
			setPhotos(assets);
		} catch (error) {
			console.log("Error loading photos:", error);
		}
	};

	if (hasPermission === null) {
		return (
			<View style={styles.container}>
				<Text>Requesting media library permissions...</Text>
			</View>
		);
	}

	if (hasPermission === false) {
		return (
			<View style={styles.container}>
				<Text style={styles.message}>
					We need your permission to access the gallery
				</Text>
				<Button
					title='Grant Permission'
					onPress={() => MediaLibrary.requestPermissionsAsync()}
				/>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={onBack}
				>
					<Ionicons
						name='arrow-back'
						size={28}
						color='black'
					/>
				</TouchableOpacity>
				<Text style={styles.title}>Gallery</Text>
			</View>

			<FlatList
				data={photos}
				keyExtractor={(item) => item.id}
				numColumns={3}
				renderItem={({ item }) => (
					<Image
						source={{ uri: item.uri }}
						style={styles.thumbnail}
					/>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	backButton: {
		marginRight: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
	message: {
		textAlign: "center",
		paddingBottom: 10,
	},
	thumbnail: {
		width: "32%",
		aspectRatio: 1,
		margin: "0.65%",
	},
});
