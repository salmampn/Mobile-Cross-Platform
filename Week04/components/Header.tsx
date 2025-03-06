import {
	View,
	Text,
	StyleSheet,
	Touchable,
	TouchableOpacity,
	Alert,
} from "react-native";

const Header = () => {
	const styles = StyleSheet.create({
		bg: {
			width: "100%",
			backgroundColor: "pink",
			padding: 10,
			paddingTop: 30,
			marginBottom: 10,
		},
		text: {
			color: "black",
			fontWeight: "bold",
		},
		nav: {
			flexDirection: "row",
			gap: "4",
		},
	});

	return (
		<>
			<View style={styles.bg}>
				<View style={styles.nav}>
					<TouchableOpacity onPress={() => Alert.alert("Hello")}>
						<Text style={styles.text}>{" < Back"}</Text>
					</TouchableOpacity>
					<Text style={styles.text}>Profile</Text>
				</View>
			</View>
		</>
	);
};
export default Header;
