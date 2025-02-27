import React, { useState } from "react";
import {
	View,
	Text,
	Button,
	TouchableOpacity,
	Alert,
	StyleSheet,
} from "react-native";

import Modal from "react-native-modal";

const Lat1 = () => {
	const [angka, setAngka] = useState(0);
	const [modalVisible, setModalVisible] = useState(false);

	const toggleModal = () => {
		setModalVisible(!modalVisible);
	};

	const styles = StyleSheet.create({
		btnContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			gap: 10,
		},
	});

	return (
		<>
			<View>
				<Text style={{ marginBottom: 10 }}>Angka saya: {angka}</Text>
				<View style={styles.btnContainer}>
					<Button
						title='Tambah'
						onPress={() => setAngka(angka + 1)}
					/>
					<Button
						title='Kurang'
						onPress={() => setAngka(angka - 1)}
					/>
					<Button
						title='Reset'
						onPress={() => setAngka(0)}
					/>
				</View>
				<TouchableOpacity
					onPress={() => Alert.alert("Hello")}
					style={{ alignItems: "center", marginTop: 10, marginBottom: 10 }}
				>
					<Text>Click me!</Text>
				</TouchableOpacity>
				<Button
					title='Show Modal'
					onPress={toggleModal}
				/>
				<Modal isVisible={modalVisible}>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "white",
							height: 200,
						}}
					>
						<Text>Hello World!</Text>
						<Button
							title='Hide Modal'
							onPress={toggleModal}
						/>
					</View>
				</Modal>
			</View>
		</>
	);
};
export default Lat1;
