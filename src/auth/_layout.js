import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import SingInUp from "./sign-in-up";
import MainScreen from "../screens/MainScreen";
import ChatsScreen from "../screens/ChatsScreen";
import ChatScreen from "../screens/ChatScreen";
import CameraScreen from "../screens/CameraScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CallLogsScreen from "../screens/CallScreen";
import StoriesScreen from "../screens/StoriesScreen";
import TextInputScreen from "../screens/TextInputScreen";
import VoiceCallScreen from "../screens/VoiceCallScreen";
import VideoCallScreen from "../screens/VideoCallScreen";
import AccountScreen from "../screens/AccountScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import DataStorageScreen from "../screens/DataStorageScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
import ConfirmDeleteScreen from "../screens/ConfirmDeleteScreen";
import NewContactScreen from "../screens/NewContactScreen";
import MediaScreen from "../components/MediaScreen";

const Stack = createStackNavigator();

const AuthLayout = () => {
  return (
    <Stack.Navigator initialRouteName="SignInUp">
      <Stack.Screen
        name="SignInUp"
        component={SingInUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chats"
        component={ChatsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Call"
        component={CallLogsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Stories"
        component={StoriesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TextInput"
        component={TextInputScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Voice"
        component={VoiceCallScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Video"
        component={VideoCallScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Data"
        component={DataStorageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Delete"
        component={DeleteAccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Confirm"
        component={ConfirmDeleteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewContact"
        component={NewContactScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Media"
        component={MediaScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthLayout;
