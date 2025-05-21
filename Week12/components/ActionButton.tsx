import React from "react";
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ActionButtonProps {
	title: string;
	onPress: () => void;
	iconName?: string;
	disabled?: boolean;
	loading?: boolean;
	backgroundColor?: string;
	textColor?: string;
}

const ActionButton = ({
	title,
	onPress,
	iconName,
	disabled = false,
	loading = false,
	backgroundColor = "#3498db",
	textColor = "white",
}: ActionButtonProps) => {
	const buttonStyle = {
		...styles.button,
		backgroundColor: disabled ? "#ccc" : backgroundColor,
	};

	return (
		<TouchableOpacity
			style={buttonStyle}
			onPress={onPress}
			disabled={disabled || loading}
			activeOpacity={0.8}
		>
			{loading ? (
				<ActivityIndicator
					color={textColor}
					size='small'
				/>
			) : (
				<>
					{iconName && (
						<Ionicons
							name={iconName as any}
							size={20}
							color={textColor}
							style={styles.icon}
						/>
					)}
					<Text style={[styles.text, { color: textColor }]}>{title}</Text>
				</>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 8,
		marginVertical: 8,
	},
	text: {
		fontSize: 16,
		fontWeight: "600",
	},
	icon: {
		marginRight: 8,
	},
});

export default ActionButton;
