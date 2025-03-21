import { Dimensions, Platform, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
	Easing,
	ReduceMotion,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";

const Meet7_lat1 = () => {
	const width = Dimensions.get("window").width;
	const height = Dimensions.get("window").height;
	const [orientation, setOrientation] = useState("portrait");

	const posXtiming = useSharedValue(-200);
	const posXspring = useSharedValue(200);
	const AnimationStyle1 = useAnimatedStyle(() => ({
		transform: [{ translateX: posXtiming.value }],
	}));
	const AnimationStyle2 = useAnimatedStyle(() => ({
		transform: [{ translateX: posXspring.value }],
	}));

	useEffect(() => {
		const updateOrientation = () => {
			const { width, height } = Dimensions.get("window");
			if (width < height) {
				setOrientation("portrait");
			} else {
				setOrientation("landscape");
			}
		};

		Dimensions.addEventListener("change", updateOrientation);
		posXspring.value = withSpring(0, { damping: 20, stiffness: 90 });
		posXtiming.value = withTiming(0, {
			duration: 3000,
			easing: Easing.bounce,
			reduceMotion: ReduceMotion.System,
		});
	});

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Meet 7</Text>
			<Text>Width: {width}</Text>
			<Text>Height: {height}</Text>
			<Text>Orientation: {orientation}</Text>
			<Text>Your OS: {Platform.OS}</Text>
			<Text>OS Version: {Platform.Version}</Text>
			<Animated.Text style={AnimationStyle1}>Animation 1</Animated.Text>
			<Animated.Text style={AnimationStyle2}>Animation 2</Animated.Text>
		</View>
	);
};

export default Meet7_lat1;
