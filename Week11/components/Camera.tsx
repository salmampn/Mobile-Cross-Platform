import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useState, useRef } from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { supabase } from "../lib/supabase";
import ActionButton from "./ActionButton";

interface CameraProps {
	onBack: () => void;
	onPhotoTaken: (
		photoUrl: string,
		location: Location.LocationObject | null
	) => void;
}

export default function Camera({ onBack, onPhotoTaken }: CameraProps) {
	const [facing, setFacing] = useState<CameraType>("back");
	const [permission, requestPermission] = useCameraPermissions();
	const cameraRef = useRef<CameraView | null>(null);
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState<string | null>(null);

	if (!permission) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator
					size='large'
					color='#3498db'
				/>
			</View>
		);
	}

	if (!permission.granted) {
		return (
			<View style={styles.permissionContainer}>
				<Ionicons
					name='camera-outline'
					size={70}
					color='#3498db'
				/>
				<Text style={styles.permissionTitle}>Camera Access Required</Text>
				<Text style={styles.permissionMessage}>
					We need your permission to use the camera for taking photos
				</Text>
				<ActionButton
					title='Grant Permission'
					onPress={requestPermission}
					iconName='checkmark-circle'
					backgroundColor='#3498db'
				/>
			</View>
		);
	}

	function toggleCameraFacing() {
		setFacing((current) => (current === "back" ? "front" : "back"));
	}

	async function takePhoto() {
		if (cameraRef.current) {
			try {
				setUploading(true);
				setUploadProgress("Taking photo...");

				// Take photo
				const photo = await cameraRef.current.takePictureAsync();
				console.log("Photo taken:", photo.uri);

				// Get location
				setUploadProgress("Getting location...");
				let location: Location.LocationObject | null = null;
				try {
					const { status } = await Location.requestForegroundPermissionsAsync();
					if (status === "granted") {
						location = await Location.getCurrentPositionAsync({});
						console.log("Location captured:", location);
					} else {
						console.log("Permission to access location was denied");
					}
				} catch (error) {
					console.error("Error getting location:", error);
				}

				// Save to device
				setUploadProgress("Saving to device...");
				const { status } = await MediaLibrary.requestPermissionsAsync();
				if (status === "granted") {
					const asset = await MediaLibrary.createAssetAsync(photo.uri);
					const album = await MediaLibrary.getAlbumAsync("Pictures");
					if (album == null) {
						await MediaLibrary.createAlbumAsync("Pictures", asset, false);
					} else {
						await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
					}
					console.log("Photo saved to Pictures folder");
				} else {
					console.log("Permission to access media library denied");
				}

				// Create a unique filename for the photo
				const fileName = `photo_${new Date().getTime()}.jpg`;
				const filePath = `photos/${fileName}`;

				// Upload to Supabase
				setUploadProgress("Uploading to cloud...");
				try {
					// Convert the photo URI to a blob
					const response = await fetch(photo.uri);
					const blob = await response.blob();

					// Convert blob to array buffer
					const arrayBuffer = await new Response(blob).arrayBuffer();
					const uint8Array = new Uint8Array(arrayBuffer);

					// Upload the file to Supabase storage
					const { data: uploadData, error: uploadError } =
						await supabase.storage.from("media").upload(filePath, uint8Array, {
							contentType: "image/jpeg",
							upsert: true,
						});

					if (uploadError) {
						throw new Error(`Storage upload error: ${uploadError.message}`);
					}
				} catch (uploadException) {
					console.error("Exception during file upload:", uploadException);
					throw uploadException;
				}

				// Get the public URL for the uploaded image
				setUploadProgress("Processing...");
				const { data: publicUrlData } = supabase.storage
					.from("media")
					.getPublicUrl(filePath);

				const imageUrl = publicUrlData?.publicUrl;

				// Save metadata to Supabase database
				setUploadProgress("Saving metadata...");
				try {
					const dataToInsert = {
						photo_url: imageUrl,
						latitude: location?.coords.latitude,
						longitude: location?.coords.longitude,
						timestamp: new Date().toISOString(),
						location_data: location ? JSON.stringify(location) : null,
					};

					const { data: dbData, error: dbError } = await supabase
						.from("photos")
						.insert([dataToInsert]);

					if (dbError) {
						throw new Error(
							`Database error: ${dbError.message || JSON.stringify(dbError)}`
						);
					}
				} catch (dbException) {
					console.error("Exception during database operation:", dbException);
					throw dbException;
				}

				// Call the callback function
				setUploadProgress("Done!");
				if (onPhotoTaken) {
					onPhotoTaken(imageUrl, location);
				}
			} catch (error) {
				console.error("Error processing photo:", error);
				alert(`Error saving photo: ${error.message}`);
			} finally {
				setUploading(false);
				setUploadProgress(null);
			}
		}
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
						color='white'
					/>
					<Text style={styles.backButtonText}>Back</Text>
				</TouchableOpacity>
			</View>

			<CameraView
				style={styles.camera}
				facing={facing}
				ref={cameraRef}
			>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.flipButton}
						onPress={toggleCameraFacing}
					>
						<Ionicons
							name='camera-reverse'
							size={28}
							color='white'
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.captureButton}
						onPress={takePhoto}
						disabled={uploading}
					>
						{uploading ? (
							<ActivityIndicator
								color='white'
								size='small'
							/>
						) : (
							<View style={styles.captureButtonInner} />
						)}
					</TouchableOpacity>

					<View style={styles.emptySpace}></View>
				</View>
			</CameraView>

			{uploading && (
				<View style={styles.uploadingOverlay}>
					<ActivityIndicator
						size='large'
						color='white'
					/>
					<Text style={styles.uploadingText}>{uploadProgress}</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#000",
	},
	permissionContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
		padding: 30,
	},
	permissionTitle: {
		fontSize: 22,
		fontWeight: "bold",
		marginTop: 20,
		marginBottom: 10,
	},
	permissionMessage: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 30,
		color: "#666",
	},
	header: {
		height: 90,
		paddingTop: 40,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
		flexDirection: "row",
		alignItems: "center",
		zIndex: 10,
	},
	backButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	backButtonText: {
		color: "white",
		fontSize: 18,
		marginLeft: 8,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		position: "absolute",
		bottom: 30,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		paddingHorizontal: 30,
	},
	flipButton: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	captureButton: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: "rgba(255, 255, 255, 0.3)",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 4,
		borderColor: "white",
	},
	captureButtonInner: {
		width: 54,
		height: 54,
		borderRadius: 27,
		backgroundColor: "white",
	},
	emptySpace: {
		width: 50,
	},
	uploadingOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 20,
	},
	uploadingText: {
		color: "white",
		fontSize: 16,
		marginTop: 20,
	},
});
