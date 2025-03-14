import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Switch } from "react-native";
import PropTypes from "prop-types";
import { Picker } from "@react-native-picker/picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const Meet6_latih1 = () => {
	const [selectedLanguage, setSelectedLanguage] = useState("");
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	const Tampil_data = ({ nama, umur }) => {
		return (
			<View style={{ marginBottom: 10 }}>
				<Text>Nama: {nama}</Text>
				<Text>Umur: {umur}</Text>
			</View>
		);
	};

	Tampil_data.propTypes = {
		nama: PropTypes.string,
		umur: PropTypes.number,
	};

	const styles = StyleSheet.create({
		input: {
			width: 200,
			borderColor: "black",
			borderWidth: 1,
		},
	});

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Tampil_data
				nama='Budi'
				umur={20}
			/>
			<TextInput
				style={styles.input}
				placeholder='Masukkan nama'
				keyboardType='default'
			/>
			<TextInput
				style={styles.input}
				placeholder='Masukkan umur'
				keyboardType='numeric'
			/>
			<TextInput
				style={styles.input}
				placeholder='Masukkan email'
				keyboardType='email-address'
			/>

			<Picker
				selectedValue={selectedLanguage}
				onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
				style={{ width: 200 }}
			>
				<Picker.Item
					label='Java'
					value='java'
				/>
				<Picker.Item
					label='JavaScript'
					value='js'
				/>
			</Picker>

			<Switch
				trackColor={{ false: "#767577", true: "#81b0ff" }}
				thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
				ios_backgroundColor='#3e3e3e'
				onValueChange={toggleSwitch}
				value={isEnabled}
			/>

			<RNDateTimePicker
				value={new Date()}
				mode='date'
				display='calendar'
			/>
		</View>
	);
};
export default Meet6_latih1;
