import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import {
	Button,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
} from "react-native";

const Meet9 = () => {
	const [facing, setFacing] = useState<CameraType>("back");
	const [permission, requestPermission] = useCameraPermissions();
	const [photo, setPhoto] = useState<string | null>(null);
	const cameraRef = useRef<any>(null);

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View style={styles.container}>
				<Text style={styles.message}>
					We need your permission to show the camera
				</Text>
				<Button
					onPress={requestPermission}
					title='grant permission'
				/>
			</View>
		);
	}

	function toggleCameraFacing() {
		setFacing((current) => (current === "back" ? "front" : "back"));
	}

	async function takePicture() {
		if (cameraRef.current) {
			const photo = await cameraRef.current.takePictureAsync();
			setPhoto(photo.uri);
		}
	}

	if (photo) {
		return (
			<View style={styles.container}>
				<Image
					source={{ uri: photo }}
					style={styles.camera}
				/>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<CameraView
				ref={cameraRef}
				style={styles.camera}
				facing={facing}
			>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={toggleCameraFacing}
					>
						<Text style={styles.text}>Flip Camera</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={takePicture}
					>
						<Text style={styles.text}>Ambil Foto</Text>
					</TouchableOpacity>
				</View>
			</CameraView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	message: {
		textAlign: "center",
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "transparent",
		position: "absolute",
		bottom: 20,
		width: "100%",
		justifyContent: "space-around",
		paddingHorizontal: 20,
	},
	photoButtonContainer: {
		flexDirection: "row",
		backgroundColor: "transparent",
		position: "absolute",
		bottom: 20,
		width: "100%",
		justifyContent: "center",
	},
	button: {
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
		padding: 15,
		borderRadius: 10,
	},
	backButtonContainer: {
		position: "absolute",
		top: 20,
		left: 20,
		zIndex: 10,
	},
	backButton: {
		backgroundColor: "rgba(0,0,0,0.5)",
		padding: 10,
		borderRadius: 10,
	},
	text: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
	},
});

export default Meet9;
