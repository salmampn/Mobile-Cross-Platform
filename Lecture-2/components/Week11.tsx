import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { app, db, storage } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import styles from "../Style";

const Week11 = () => {
	const teksCollection = collection(db, "teks");

	useEffect(() => {
		console.log("Firebase App initialized:", app.name);
		console.log("Database: ", db);
		console.log("Storage: ", storage);
	}, []);

	const teksYangAkanDisimpan = "test lagi bos";

	const simpanTeks = async () => {
		console.log("simpan teks called");
		try {
			console.log("1");
			const docRef = await addDoc(teksCollection, {
				isi: teksYangAkanDisimpan,
				timestamp: new Date(),
			});
			console.log("Dokumen berhasil ditambahkan dengan ID: ", docRef.id);
			alert("Teks berhasil disimpan!");
		} catch (error) {
			console.log("2");
			console.error("Error menambahkan dokumen: ", error);
			alert("Gagal menyimpan teks.");
		}
	};

	return (
		<View style={styles.container}>
			<Text>
				Firebase {app.name} Status: {app ? "Berhasil inisialisasi" : "Gagal"}
			</Text>
			<Text>Database: {db.type}</Text>
			<Text>Storage: {storage.maxOperationRetryTime}</Text>
			<Button
				title='Simpan Teks ke Firestore'
				onPress={simpanTeks}
			/>
		</View>
	);
};
export default Week11;
