import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { Card } from "@rneui/themed";
import LocationDisplay from "./LocationDisplay";

interface PhotoCardProps {
	photoUrl: string;
	latitude?: string | number | null;
	longitude?: string | number | null;
	timestamp?: string;
}

const PhotoCard = ({
	photoUrl,
	latitude,
	longitude,
	timestamp,
}: PhotoCardProps) => {
	return (
		<Card containerStyle={styles.card}>
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
	},
	image: {
		width: "100%",
		height: width - 60,
		borderRadius: 10,
		marginBottom: 10,
	},
});

export default PhotoCard;
