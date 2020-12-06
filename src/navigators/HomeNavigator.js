import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Overview, Setting, VideoScreen,Strips } from "../screens";

import InactiveHomeIcon from "../static/images/Homewhite.png";
import ActiveAppsIcon from "../static/images/ActiveAppsIcon.svg";
import InactiveAppsIcon from "../static/images/InactiveAppsIcon.svg";
import ActiveHome from "../static/images/ActiveHome.svg";
import InactiveHome from "../static/images/InactiveHome.svg";
import ActiveSetting from "../static/images/ActiveSetting.svg";
import InactiveSetting from "../static/images/InactiveSetting.svg";
import { StackActions } from "@react-navigation/native";

const { Navigator, Screen } = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route => {
          if (route.name === "videoScreen") {
            return "Video";
          }  else if (route.name === "strips") {
            return "Strips";
          }
        };

        const Appicon = (route, isFocused) => {
          if (route.name === "videoScreen") {
            return isFocused ? <ActiveHome /> : <InactiveHome />;
          } else if (route.name === "strips") {
            return isFocused ? <ActiveSetting /> : <InactiveSetting />;
          }
        };

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#ffffff",
              padding: 10
            }}
          >
            {Appicon(route, isFocused)}
            <Text style={styles.bottomText}>{label(route)}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const HomeNavigator = ({ navigation }) => {
  return (
    <Navigator headerMode="none" initialRouteName="videoScreen" tabBar={props => <MyTabBar {...props} />}>
      <Screen name="videoScreen" component={VideoScreen} options={{ tabBarLabel: "video" }} />
      <Screen name="strips" component={Strips} />
    </Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({
  bottomText: {
    fontFamily: "NunitoSans",
    fontSize: 10,
    fontWeight: "bold",
    color: "#8689a4"
  }
});
