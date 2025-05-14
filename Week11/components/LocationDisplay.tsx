import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";

interface LocationDisplayProps {
	longitude: string | number;
	latitude: string | number;
	timestamp?: string;
}

const LocationDisplay = ({
	longitude,
	latitude,
	timestamp,
}: LocationDisplayProps) => {
	return (
		<Card containerStyle={styles.card}>
			<Card.Title style={styles.cardTitle}>
				<Ionicons
					name='location'
					size={18}
					color='#3498db'
				/>{" "}
				Location Data
			</Card.Title>
			<Card.Divider />
			<View style={styles.locationInfo}>
				<View style={styles.locationRow}>
					<Ionicons
						name='compass'
						size={18}
						color='#3498db'
					/>
					<Text style={styles.locationText}>
						Longitude: {longitude || "Not available"}
					</Text>
				</View>
				<View style={styles.locationRow}>
					<Ionicons
						name='compass'
						size={18}
						color='#3498db'
					/>
					<Text style={styles.locationText}>
						Latitude: {latitude || "Not available"}
					</Text>
				</View>
				{timestamp && (
					<View style={styles.locationRow}>
						<Ionicons
							name='time'
							size={18}
							color='#3498db'
						/>
						<Text style={styles.locationText}>
							{new Date(timestamp).toLocaleString()}
						</Text>
					</View>
				)}
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		borderRadius: 10,
		marginHorizontal: 0,
		marginVertical: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	cardTitle: {
		fontSize: 18,
		textAlign: "left",
		marginBottom: 5,
	},
	locationInfo: {
		paddingVertical: 5,
	},
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	locationText: {
		fontSize: 14,
		marginLeft: 10,
	},
});

export default LocationDisplay;
