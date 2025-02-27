import { ScrollView, Text, View } from "react-native";

const Lat2 = () => {
	const array = [];
	for (let i = 1; i <= 100; i++) {
		array.push("ini teks nomor:" + i);
	}
	return (
		<>
			<ScrollView
				style={{ maxHeight: 200, backgroundColor: "lightblue", marginTop: 10 }}
			>
				<View>
					<Text style={{ fontWeight: "bold", padding: 10 }}>{array}</Text>
				</View>
			</ScrollView>
		</>
	);
};
export default Lat2;
