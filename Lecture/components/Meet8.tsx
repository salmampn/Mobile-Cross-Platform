import { useEffect, useState } from "react";
import { View, Text } from "react-native";

const Meet8 = () => {
	const [data, setData] = useState<any>(null);
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/posts/1")
			.then((response) => response.json())
			.then((json) => {
				setData(json);
			})
			.catch((error) => {
				console.error("ini ada error", error);
			});
	}, []);

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Meet 8</Text>
			{data && (
				<View style={{ flexDirection: "column", gap: 4 }}>
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
export default Meet8;
