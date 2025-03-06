import { View, Text, StyleSheet } from "react-native";

const CustomCard = ({ title, content, backgroundColor }) => {
	const styles = StyleSheet.create({
		card: {
			width: "95%",
			padding: 20,
			margin: 10,
			borderRadius: 10,
		},
		title: {
			flexDirection: "row",
			alignItems: "center",
			fontWeight: "bold",
		},
		desc: {
			marginTop: 10,
		},
	});
	return (
		<View>
			<View style={[styles.card, { backgroundColor }]}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.desc}>{content}</Text>
			</View>
		</View>
	);
};
export default CustomCard;
