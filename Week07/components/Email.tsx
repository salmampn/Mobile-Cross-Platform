import { Button, Text, View } from "react-native";
import styles from "./Style";

const Email = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>Email List Page</Text>
			<Button
				title='Go Home'
				onPress={() => navigation.navigate("Home")}
			/>
		</View>
	);
};
export default Email;
