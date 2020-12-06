import React, { useEffect } from "react";
import { StatusBar, Platform, View } from "react-native";
import AppNavigator from "./src/navigators/AppNavigator";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import getStatusBarHeight from "./src/utils/getStatusBarHeight";
import SnackBar from "./src/components/SnackBar";
import SplashScreen from "react-native-splash-screen";
import Icon from "react-native-vector-icons/Octicons";
import Icon1 from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/FontAwesome";

Icon.loadFont();
Icon1.loadFont();
Icon2.loadFont();
Icon3.loadFont();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      <Provider store={store}>
        <StatusBar translucent barStyle="dark-content" backgroundColor="#f8f8f8" />
        <View
          style={{
            height: getStatusBarHeight()
          }}
        />
        <AppNavigator />
        <SnackBar id={"root_app"} />
      </Provider>
    </>
  );
};

export default App;
