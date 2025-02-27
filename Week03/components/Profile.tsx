import { View, Text, StyleSheet } from "react-native";

interface IProfile {
	name: string;
	count: number;
}

const Profile = ({ name, count }: IProfile) => {
	return (
		<View style={styles.container}>
			<Text>Halo nama ku, {name}!</Text>
			<Text>Umur ku, {count} tahun</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
});

export default Profile;
