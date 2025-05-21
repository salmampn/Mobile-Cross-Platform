import React from "react";
import {
	View,
	Image,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Alert,
} from "react-native";
import { Card } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import LocationDisplay from "./LocationDisplay";

interface PhotoCardProps {
	id: number;
	photoUrl: string;
	latitude?: string | number | null;
	longitude?: string | number | null;
	timestamp?: string;
	onDelete?: (id: number, photoUrl: string) => void;
}

const PhotoCard = ({
	id,
	photoUrl,
	latitude,
	longitude,
	timestamp,
	onDelete,
}: PhotoCardProps) => {
	const handleDelete = () => {
		Alert.alert(
			"Delete Photo",
			"Are you sure you want to delete this photo? This action cannot be undone.",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: () => onDelete && onDelete(id, photoUrl),
				},
			]
		);
	};

	return (
		<Card containerStyle={styles.card}>
			<TouchableOpacity
				style={styles.deleteButton}
				onPress={handleDelete}
			>
				<Ionicons
					name='trash-outline'
					size={24}
					color='white'
				/>
			</TouchableOpacity>

			<Image
				source={{ uri: photoUrl }}
				style={styles.image}
				resizeMode='cover'
			/>
			{(latitude || longitude) && (
				<LocationDisplay
					latitude={latitude || "N/A"}
					longitude={longitude || "N/A"}
					timestamp={timestamp}
				/>
			)}
		</Card>
	);
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	card: {
		borderRadius: 15,
		padding: 10,
		marginHorizontal: 0,
		marginVertical: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 5,
		position: "relative",
	},
	image: {
		width: "100%",
		height: width - 60,
		borderRadius: 10,
		marginBottom: 10,
	},
	deleteButton: {
		position: "absolute",
		right: 10,
		top: 10,
		backgroundColor: "rgba(231, 76, 60, 0.8)",
		borderRadius: 20,
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 10,
	},
});

export default PhotoCard;
