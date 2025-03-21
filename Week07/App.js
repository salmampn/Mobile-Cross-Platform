import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Email from "./components/Email";
import HomeScreen from "./components/HomeScreen";
import Profile from "./components/Profile";
import UserList from "./components/UserList";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='Home'
					component={HomeScreen}
				/>
				<Stack.Screen
					name='Email'
					component={Email}
				/>
				<Stack.Screen
					name='User List'
					component={UserList}
				/>
				<Stack.Screen
					name='Profile'
					component={Profile}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
