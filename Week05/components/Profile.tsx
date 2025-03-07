import { View, Text, Button } from "react-native";
import { Avatar } from "react-native-paper";
import styles from "../Style";

const Profile = ({ navigation, route }) => {
	const { userName, email, photo_url } = route.params;
	return (
		<View style={styles.container}>
			<Avatar.Image
				size={100}
				source={{ uri: photo_url }}
			/>
			<Text>{userName}&apos;s Profile</Text>
			<Text>{email}</Text>
			<Button
				title='Go Back'
				onPress={() => navigation.navigate("User List")}
			/>
		</View>
	);
};
export default Profile;
