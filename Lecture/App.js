import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Meet5_Home from "./components/Meet5_Home";
import Meet5_Profile from "./components/Meet5_Profile";
import Meet6_latih1 from "./components/Meet6_latih1";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Meet7_lat1 from "./components/Meet7_lat1";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
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
					<Drawer.Screen
						name='Meet 6'
						component={Meet6_latih1}
					/>
					<Drawer.Screen
						name='Meet 7'
						component={Meet7_lat1}
					/>
				</Drawer.Navigator>
			</NavigationContainer>
		);
	};

	return (
		// Lecture
		// <StackNavigation/>
		// <TabNavigation />
		<DrawerNavigation />
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
}
