import { Text, View } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

const Geolocations = () => {
	const [lokasi, setLokasi] = useState({});

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();

			if (status == "granted") {
				console.log("permission success");
			} else {
				console.log("permission not granted");
			}

			const loc = await Location.getCurrentPositionAsync();

			console.log(loc);

			setLokasi(loc);
		})();
	}, []);

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>ini adalah meet10 maps</Text>

			<Text>{JSON.stringify(lokasi)}</Text>
		</View>
	);
};
export default Geolocations;
