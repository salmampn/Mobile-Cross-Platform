import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	Platform,
	ActivityIndicator,
	Text,
	ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { supabase } from "./lib/supabase";

// Components
import Header from "./components/Header";
import Camera from "./components/Camera";
import ActionButton from "./components/ActionButton";
import Geolocation from "./components/Geolocation";
import LocationDisplay from "./components/LocationDisplay";
import PhotoCard from "./components/PhotoCard";

export default function App() {
	const [showCamera, setShowCamera] = useState(false);
	const [hasMediaPermission, setHasMediaPermission] = useState(null);
	const [longitude, setLongitude] = useState("");
	const [latitude, setLatitude] = useState("");
	const [showGeoLocation, setShowGeoLocation] = useState(false);
	const [fullLocationData, setFullLocationData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [photosLoading, setPhotosLoading] = useState(false);
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		(async () => {
			const { status } = await MediaLibrary.requestPermissionsAsync();
			setHasMediaPermission(status === "granted");
			fetchPhotos();

			// Request location permission at startup
			const { status: locationStatus } =
				await Location.requestForegroundPermissionsAsync();
			if (locationStatus === "granted") {
				fetchCurrentLocation();
			}
		})();
	}, []);
	const fetchPhotos = async () => {
		try {
			setPhotosLoading(true);
			const { data, error } = await supabase
				.from("photos")
				.select("*")
				.order("timestamp", { ascending: false });

			if (error) {
				throw error;
			}
			if (data) {
				setPhotos(data);
			}
		} catch (error) {
			console.error("Error fetching photos:", error);
		} finally {
			setPhotosLoading(false);
		}
	};

	const handlePhotoTaken = async (photoUrl, location) => {
		setShowCamera(false);
		fetchPhotos();
		if (location) {
			setLatitude(location.coords.latitude.toString());
			setLongitude(location.coords.longitude.toString());
			setFullLocationData(location);
		}
	};

	const handleLocationUpdate = (newLongitude, newLatitude, locationData) => {
		setLongitude(newLongitude.toString());
		setLatitude(newLatitude.toString());
		setFullLocationData(locationData);
	};

	const fetchCurrentLocation = async () => {
		try {
			setLoading(true);
			let location = await Location.getCurrentPositionAsync({});
			setLatitude(location.coords.latitude.toString());
			setLongitude(location.coords.longitude.toString());
			setFullLocationData(location);
		} catch (error) {
			console.error("Error fetching location:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleGetLocation = () => {
		setShowGeoLocation(!showGeoLocation);
		if (!fullLocationData) {
			fetchCurrentLocation();
		}
	};

	const saveLocationFile = async () => {
		if (!fullLocationData) {
			alert("No location data to save!");
			return;
		}

		const fileUri = `${FileSystem.documentDirectory}location_data.txt`;
		const dataToSave = JSON.stringify(fullLocationData, null, 2);

		try {
			await FileSystem.writeAsStringAsync(fileUri, dataToSave, {
				encoding: FileSystem.EncodingType.UTF8,
			});

			if (await Sharing.isAvailableAsync()) {
				await Sharing.shareAsync(fileUri);
			} else {
				alert("Sharing is not available on this device.");
			}
		} catch (err) {
			console.error(err);
			alert("Failed to save location data.");
		}
	};

	if (showCamera) {
		return (
			<Camera
				onBack={() => setShowCamera(false)}
				onPhotoTaken={handlePhotoTaken}
			/>
		);
	}
	return (
		<SafeAreaView style={styles.safeArea}>
			<Header
				title='Photo Location App'
				subtitle='Salma Manda Putri Nabilah - 00000077712'
			/>

			<View style={styles.container}>
				<View style={styles.buttonGroup}>
					<ActionButton
						title='Open Camera'
						onPress={() => setShowCamera(true)}
						iconName='camera'
					/>{" "}
					<ActionButton
						title={
							showGeoLocation
								? "Hide Location"
								: fullLocationData
								? "Show Location"
								: "Get Location"
						}
						onPress={handleGetLocation}
						iconName='location'
						backgroundColor='#2ecc71'
					/>
					{fullLocationData && (
						<ActionButton
							title='Refresh Location'
							onPress={fetchCurrentLocation}
							iconName='refresh'
							backgroundColor='#f39c12'
						/>
					)}
					<ActionButton
						title='Save Location Data'
						onPress={saveLocationFile}
						iconName='download'
						backgroundColor='#9b59b6'
						disabled={!fullLocationData}
					/>
				</View>{" "}
				<View style={styles.locationSection}>
					{showGeoLocation &&
						(loading ? (
							<View style={styles.loadingContainer}>
								<ActivityIndicator
									size='large'
									color='#3498db'
								/>
								<Text style={styles.loadingText}>Getting location...</Text>
							</View>
						) : fullLocationData ? (
							<LocationDisplay
								latitude={latitude}
								longitude={longitude}
							/>
						) : (
							<Text>No location data available</Text>
						))}
				</View>{" "}
				{/* Photos display section */}{" "}
				<ScrollView
					style={styles.photosContainer}
					contentContainerStyle={styles.photosContentContainer}
				>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Your Photos</Text>
						<ActionButton
							title='Refresh'
							onPress={fetchPhotos}
							iconName='refresh'
							backgroundColor='#3498db'
							buttonStyle={styles.refreshButton}
						/>
					</View>
					{photosLoading ? (
						<View style={styles.loadingContainer}>
							<ActivityIndicator
								size='large'
								color='#3498db'
							/>
							<Text style={styles.loadingText}>Loading photos...</Text>
						</View>
					) : photos.length > 0 ? (
						photos.map((photo) => (
							<PhotoCard
								key={photo.id}
								photoUrl={photo.photo_url}
								latitude={photo.latitude}
								longitude={photo.longitude}
								timestamp={photo.timestamp}
							/>
						))
					) : (
						<Text style={styles.noPhotosText}>No photos available</Text>
					)}
				</ScrollView>
			</View>
			<StatusBar style='auto' />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: Platform.OS === "android" ? 25 : 0,
	},
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	buttonGroup: {
		padding: 15,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	locationSection: {
		padding: 15,
	},
	loadingContainer: {
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	loadingText: {
		marginTop: 10,
		fontSize: 16,
		color: "#3498db",
	},
	photosContainer: {
		flex: 1,
	},
	photosContentContainer: {
		padding: 15,
		paddingBottom: 30,
	},
	noPhotosText: {
		textAlign: "center",
		fontSize: 16,
		color: "#95a5a6",
		marginTop: 20,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#2c3e50",
		flex: 1,
	},
	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 15,
	},
	refreshButton: {
		minWidth: 80,
		height: 36,
	},
});
