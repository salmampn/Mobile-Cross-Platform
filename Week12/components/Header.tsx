import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface HeaderProps {
	title: string;
	subtitle?: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
	return (
		<View style={styles.header}>
			<Text style={styles.title}>{title}</Text>
			{subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		paddingTop: 50,
		paddingBottom: 15,
		paddingHorizontal: 20,
		backgroundColor: "#3498db",
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},
	subtitle: {
		fontSize: 14,
		color: "rgba(255, 255, 255, 0.8)",
		marginTop: 5,
	},
});

export default Header;
