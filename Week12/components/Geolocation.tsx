import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Card } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import LocationDisplay from "./LocationDisplay";

interface GeolocationProps {
	onLocationUpdate: (
		longitude: number,
		latitude: number,
		location: Location.LocationObject
	) => void;
}

const Geolocation = ({ onLocationUpdate }: GeolocationProps) => {
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null
	);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		async function getCurrentLocation() {
			try {
				setLoading(true);
				let { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== "granted") {
					setErrorMsg("Permission to access location was denied");
					setLoading(false);
					return;
				}

				let location = await Location.getCurrentPositionAsync({});
				setLocation(location);
				if (onLocationUpdate) {
					onLocationUpdate(
						location.coords.longitude,
						location.coords.latitude,
						location
					);
				}
			} catch (error) {
				setErrorMsg("Error fetching location");
				console.error("Location error:", error);
			} finally {
				setLoading(false);
			}
		}

		getCurrentLocation();
	}, [onLocationUpdate]);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator
					size='large'
					color='#3498db'
				/>
				<Text style={styles.loadingText}>Getting location...</Text>
			</View>
		);
	}

	if (errorMsg) {
		return (
			<Card containerStyle={styles.errorCard}>
				<View style={styles.errorContent}>
					<Ionicons
						name='warning'
						size={24}
						color='#e74c3c'
					/>
					<Text style={styles.errorText}>{errorMsg}</Text>
				</View>
			</Card>
		);
	}

	if (location) {
		return (
			<LocationDisplay
				longitude={location.coords.longitude}
				latitude={location.coords.latitude}
			/>
		);
	}

	return (
		<Card containerStyle={styles.errorCard}>
			<Text>Location information unavailable</Text>
		</Card>
	);
};

const styles = StyleSheet.create({
	loadingContainer: {
		padding: 20,
		alignItems: "center",
	},
	loadingText: {
		marginTop: 10,
		color: "#555",
		fontSize: 14,
	},
	errorCard: {
		borderRadius: 10,
		padding: 15,
		backgroundColor: "#fff9fa",
		borderColor: "#ffebee",
	},
	errorContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	errorText: {
		color: "#e74c3c",
		marginLeft: 10,
		fontSize: 14,
	},
});

export default Geolocation;
