import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Email from "./components/Email";
import HomeScreen from "./components/HomeScreen";
import Profile from "./components/Profile";
import UserList from "./components/UserList";
// import Meet5_Home from "./Lecture/Meet5_Home";
// import Meet5_Profile from "./Lecture/Meet5_Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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

		// Lecture
		// <StackNavigation/>
		// <TabNavigation />
		// <DrawerNavigation />
	);

	const StackNavigation = () => {
		return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name='Home'
						component={Meet5_Home}
					/>
					<Stack.Screen
						name='Profile'
						component={Meet5_Profile}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	};

	const TabNavigation = () => {
		return (
			<NavigationContainer>
				<Tab.Navigator>
					<Tab.Screen
						name='Home'
						component={Meet5_Home}
					/>
					<Tab.Screen
						name='Profile'
						component={Meet5_Profile}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		);
	};

	const DrawerNavigation = () => {
		return (
			<NavigationContainer>
				<Drawer.Navigator>
					<Drawer.Screen
						name='Home'
						component={Meet5_Home}
					/>
					<Drawer.Screen
						name='Profile'
						component={Meet5_Profile}
					/>
				</Drawer.Navigator>
			</NavigationContainer>
		);
	};
}
