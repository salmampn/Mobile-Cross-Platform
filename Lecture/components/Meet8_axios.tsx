import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";

const Meet8_axios = () => {
	const [data, setData] = useState<any>(null);
	useEffect(() => {
		axios
			.get("https://jsonplaceholder.typicode.com/posts/1")
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.error("ini ada error", error);
			});
	}, []);

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Meet 8 Axios</Text>
			{data && (
				<View style={{ flexDirection: "column", gap: 10 }}>
					<Text>User Id: {data.userId}</Text>
					<Text>Id: {data.id}</Text>
					<Text style={{ textAlign: "center" }}>Title: {data.title}</Text>
					<Text>{data.body}</Text>
				</View>
			)}
			{!data && <Text>Loading...</Text>}
		</View>
	);
};
export default Meet8_axios;
