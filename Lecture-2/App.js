import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Week10 from "./components/Week10";
import Week11 from "./components/Week11";

const Drawer = createDrawerNavigator();

export default function App() {
	const DrawerNavigation = () => {
		return (
			<NavigationContainer>
				<Drawer.Navigator>
					<Drawer.Screen
						name='Meet 10'
						component={Week10}
					/>
					<Drawer.Screen
						name='Meet 11'
						component={Week11}
					/>
				</Drawer.Navigator>
			</NavigationContainer>
		);
	};

	return <DrawerNavigation />;
}
