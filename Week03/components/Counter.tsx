import { Button, View, Text, StyleSheet } from "react-native";

interface ICounter {
	handleIncrement: () => void;
	handleDecrement: () => void;
	handleReset: () => void;
	handlePassData: () => void;
	value: number;
}

const Counter = ({
	handleIncrement,
	handleDecrement,
	handleReset,
	handlePassData,
	value,
}: ICounter) => {
	return (
		<View>
			<Text>{value}</Text>
			<View style={styles.row}>
				<Button
					title='Increment'
					onPress={handleIncrement}
				/>
				<Button
					title='Decrement'
					onPress={handleDecrement}
				/>
			</View>
			<View style={styles.gutter}>
				<Button
					title='Reset'
					onPress={handleReset}
				/>
				<Button
					title='Pass Value'
					onPress={handlePassData}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 10,
	},
	gutter: {
		flexDirection: "column",
		justifyContent: "space-between",
		gap: 10,
		marginTop: 10,
	},
});

export default Counter;
