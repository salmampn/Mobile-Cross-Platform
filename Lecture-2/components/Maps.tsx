import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

const Maps = () => {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			setLoading(true);
			// Request location permissions
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				setLoading(false);
				return;
			}

			try {
				// Get current location
				const currentLocation = await Location.getCurrentPositionAsync({
					accuracy: Location.Accuracy.Highest,
				});

				// Update the map region with current location
				setLocation({
					latitude: currentLocation.coords.latitude,
					longitude: currentLocation.coords.longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				});
			} catch (error) {
				console.log("Error getting location:", error);
				setErrorMsg(
					"Failed to get location. Please check your location services."
				);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	// Show loading indicator while getting location
	if (loading) {
		return (
			<View style={styles.centerContainer}>
				<ActivityIndicator
					size='large'
					color='#0000ff'
				/>
				<Text style={styles.loadingText}>Getting your location...</Text>
			</View>
		);
	}

	// Show error message if permission denied or location failed
	if (errorMsg) {
		return (
			<View style={styles.centerContainer}>
				<Text style={styles.errorText}>{errorMsg}</Text>
			</View>
		);
	}

	// Only render map when location is available
	if (!location) {
		return (
			<View style={styles.centerContainer}>
				<Text>Waiting for location data...</Text>
			</View>
		);
	}

	return (
		<View style={styles.outerContainer}>
			<View style={styles.container}>
				<MapView
					style={styles.map}
					initialRegion={location}
				>
					<Marker
						coordinate={{
							latitude: location.latitude,
							longitude: location.longitude,
						}}
						title={"My Location"}
						description={"This is my current location"}
					/>
				</MapView>
			</View>

			{/* Coordinate display section */}
			<View style={styles.coordinatesContainer}>
				<Text style={styles.coordinateTitle}>Your Current Coordinates:</Text>
				<Text style={styles.coordinateText}>
					Latitude: {location.latitude.toFixed(6)}
				</Text>
				<Text style={styles.coordinateText}>
					Longitude: {location.longitude.toFixed(6)}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	outerContainer: {
		width: "100%",
		height: 380, // Increased to accommodate coordinates
	},
	container: {
		width: "100%",
		height: 300,
		alignItems: "center",
		justifyContent: "center",
	},
	centerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: 300,
	},
	map: {
		width: "100%",
		height: "100%",
	},
	loadingText: {
		marginTop: 10,
		fontSize: 16,
	},
	errorText: {
		color: "red",
		fontSize: 16,
		textAlign: "center",
		padding: 10,
	},
	coordinatesContainer: {
		backgroundColor: "#f5f5f5",
		padding: 10,
		borderRadius: 5,
		marginTop: 5,
		alignItems: "center",
	},
	coordinateTitle: {
		fontWeight: "bold",
		fontSize: 16,
		marginBottom: 5,
	},
	coordinateText: {
		fontSize: 14,
		marginVertical: 2,
	},
});

export default Maps;
