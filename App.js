import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { AuthProvider, useAuth } from "./src/context/AuthContext";

import AuthLayout from "./src/auth/_layout";
import MainScreen from "./src/screens/MainScreen";
import ChatsScreen from "./src/screens/ChatsScreen";
import ChatScreen from "./src/screens/ChatScreen";
import ContactsScreen from "./src/screens/ContactsScreen";
import StoriesScreen from "./src/screens/StoriesScreen";
import CameraScreen from "./src/screens/CameraScreen";
import TextInputScreen from "./src/screens/TextInputScreen";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import CallScreen from "./src/screens/CallScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <NavigationContainer>
            <AuthLayout />
          </NavigationContainer>
        </View>
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    justifyContent: "center",
    paddingTop: 30,
  },
});
