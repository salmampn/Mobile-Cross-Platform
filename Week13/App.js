import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	Platform,
	ActivityIndicator,
	Text,
	ScrollView,
	Alert,
	ToastAndroid,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { supabase } from "./utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import Header from "./components/Header";
import Camera from "./components/Camera";
import ActionButton from "./components/ActionButton";
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
	const [successfulUploads, setSuccessfulUploads] = useState(0);
	const [failedUploads, setFailedUploads] = useState(0);
	useEffect(() => {
		(async () => {
			const { status } = await MediaLibrary.requestPermissionsAsync();
			setHasMediaPermission(status === "granted");
			fetchPhotos();

			// Load upload metrics from persistent storage
			await loadUploadMetrics();

			// Request location permission at startup
			const { status: locationStatus } =
				await Location.requestForegroundPermissionsAsync();
			if (locationStatus === "granted") {
				fetchCurrentLocation();
			}
		})();
	}, []);

	// Save metrics whenever they change
	useEffect(() => {
		saveUploadMetrics();
	}, [successfulUploads, failedUploads]);
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
	const handlePhotoTaken = async (photoUrl, location, uploadSuccess) => {
		setShowCamera(false);
		fetchPhotos();
		if (location) {
			setLatitude(location.coords.latitude.toString());
			setLongitude(location.coords.longitude.toString());
			setFullLocationData(location);
		}

		// Update upload counts based on success/failure
		if (uploadSuccess !== undefined) {
			updateUploadCounts(uploadSuccess);
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

	// Handler for deleting photos
	const handleDeletePhoto = async (id, photoUrl) => {
		try {
			setPhotosLoading(true);

			// Extract the file path from the URL
			const filePathMatch = photoUrl.match(/media\/([^?]+)/);
			const filePath = filePathMatch ? filePathMatch[1] : null;

			if (filePath) {
				// Delete the file from Supabase storage
				const { error: storageError } = await supabase.storage
					.from("media")
					.remove([filePath]);

				if (storageError) {
					console.error("Error deleting file from storage:", storageError);
					if (Platform.OS === "android") {
						ToastAndroid.show(
							`Error deleting file: ${storageError.message}`,
							ToastAndroid.LONG
						);
					} else {
						Alert.alert(
							"Error",
							`Failed to delete file: ${storageError.message}`
						);
					}
					return;
				}
			}

			// Delete the record from the database
			const { error: dbError } = await supabase
				.from("photos")
				.delete()
				.eq("id", id);

			if (dbError) {
				console.error("Error deleting record from database:", dbError);
				if (Platform.OS === "android") {
					ToastAndroid.show(
						`Error deleting record: ${dbError.message}`,
						ToastAndroid.LONG
					);
				} else {
					Alert.alert("Error", `Failed to delete record: ${dbError.message}`);
				}
				return;
			}

			// Show success notification
			if (Platform.OS === "android") {
				ToastAndroid.show("Photo deleted successfully", ToastAndroid.SHORT);
			} else {
				Alert.alert("Success", "Photo deleted successfully");
			}

			// Refresh the photos list
			fetchPhotos();
		} catch (error) {
			console.error("Error in deletion process:", error);
			if (Platform.OS === "android") {
				ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.LONG);
			} else {
				Alert.alert("Error", `An unexpected error occurred: ${error.message}`);
			}
		} finally {
			setPhotosLoading(false);
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

	// Save upload metrics to AsyncStorage
	const saveUploadMetrics = async () => {
		try {
			const metrics = {
				successful: successfulUploads,
				failed: failedUploads,
				lastUpdated: new Date().toISOString(),
			};
			await AsyncStorage.setItem("uploadMetrics", JSON.stringify(metrics));
		} catch (error) {
			console.error("Error saving upload metrics:", error);
		}
	};

	// Load upload metrics from AsyncStorage
	const loadUploadMetrics = async () => {
		try {
			const metricsJson = await AsyncStorage.getItem("uploadMetrics");
			if (metricsJson) {
				const metrics = JSON.parse(metricsJson);
				setSuccessfulUploads(metrics.successful || 0);
				setFailedUploads(metrics.failed || 0);
			}
		} catch (error) {
			console.error("Error loading upload metrics:", error);
		}
	};

	// Update upload counts
	const updateUploadCounts = async (isSuccess) => {
		if (isSuccess) {
			setSuccessfulUploads((prevCount) => prevCount + 1);
		} else {
			setFailedUploads((prevCount) => prevCount + 1);
		}
	};
	// Reset upload metrics
	const resetUploadMetrics = async () => {
		try {
			setSuccessfulUploads(0);
			setFailedUploads(0);
			await AsyncStorage.removeItem("uploadMetrics");

			// Show confirmation
			if (Platform.OS === "android") {
				ToastAndroid.show("Upload metrics have been reset", ToastAndroid.SHORT);
			} else {
				Alert.alert(
					"Reset Complete",
					"Upload metrics have been reset to zero."
				);
			}

			// Also notify other components that might be using these metrics
			// For example, if the Camera component is open and displaying metrics
			if (showCamera) {
				// We'll handle this on the next mount of Camera component
			}
		} catch (error) {
			console.error("Error resetting upload metrics:", error);

			// Show error notification
			if (Platform.OS === "android") {
				ToastAndroid.show(
					`Failed to reset metrics: ${error.message}`,
					ToastAndroid.LONG
				);
			} else {
				Alert.alert(
					"Error",
					`Failed to reset upload metrics: ${error.message}`
				);
			}
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
					/>
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
				</View>
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
				</View>

				{/* Upload Statistics Dashboard */}
				<View style={styles.statisticsContainer}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Upload Statistics</Text>
						<ActionButton
							title='Reset'
							onPress={resetUploadMetrics}
							iconName='refresh'
							backgroundColor='#e74c3c'
							buttonStyle={styles.resetButton}
						/>
					</View>
					<View style={styles.statsRow}>
						<View style={[styles.statCard, styles.successCard]}>
							<Text style={styles.statNumber}>{successfulUploads}</Text>
							<Text style={styles.statLabel}>Successful</Text>
						</View>
						<View style={[styles.statCard, styles.failedCard]}>
							<Text style={styles.statNumber}>{failedUploads}</Text>
							<Text style={styles.statLabel}>Failed</Text>
						</View>
						<View style={[styles.statCard, styles.totalCard]}>
							<Text style={styles.statNumber}>
								{successfulUploads + failedUploads}
							</Text>
							<Text style={styles.statLabel}>Total</Text>
						</View>
					</View>
				</View>

				{/* Photos display section */}
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
								id={photo.id}
								photoUrl={photo.photo_url}
								latitude={photo.latitude}
								longitude={photo.longitude}
								timestamp={photo.timestamp}
								onDelete={handleDeletePhoto}
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
	resetButton: {
		minWidth: 80,
		height: 36,
	},
	statisticsContainer: {
		backgroundColor: "#fff",
		marginHorizontal: 15,
		marginBottom: 15,
		padding: 15,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	statsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	statCard: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 15,
		borderRadius: 8,
		marginHorizontal: 4,
	},
	successCard: {
		backgroundColor: "rgba(46, 204, 113, 0.2)",
		borderWidth: 1,
		borderColor: "#2ecc71",
	},
	failedCard: {
		backgroundColor: "rgba(231, 76, 60, 0.2)",
		borderWidth: 1,
		borderColor: "#e74c3c",
	},
	totalCard: {
		backgroundColor: "rgba(52, 152, 219, 0.2)",
		borderWidth: 1,
		borderColor: "#3498db",
	},
	statNumber: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 5,
	},
	statLabel: {
		fontSize: 12,
		color: "#7f8c8d",
	},
	statisticsContainer: {
		padding: 15,
		backgroundColor: "#fff",
		borderTopWidth: 1,
		borderTopColor: "#e0e0e0",
		marginTop: 10,
	},
	statCard: {
		flex: 1,
		padding: 10,
		backgroundColor: "#ecf0f1",
		borderRadius: 8,
		margin: 5,
		alignItems: "center",
	},
	successCard: {
		backgroundColor: "#2ecc71",
	},
	failedCard: {
		backgroundColor: "#e74c3c",
	},
	totalCard: {
		backgroundColor: "#3498db",
	},
	statsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	statsTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#2c3e50",
		marginBottom: 10,
	},
	statsLabel: {
		fontSize: 16,
		color: "#34495e",
	},
	statsValue: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#2ecc71",
	},
	resetButton: {
		marginTop: 10,
	},
});
