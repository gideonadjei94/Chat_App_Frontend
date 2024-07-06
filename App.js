import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {AuthProvider, useAuth} from './src/context/AuthContext';



import AuthLayout from './src/auth/_layout';
import MainScreen from './src/screens/MainScreen';
import ChatsScreen from './src/screens/ChatsScreen';
import ChatScreen from './src/screens/ChatScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import StoriesScreen from './src/screens/StoriesScreen';
import CameraScreen from './src/screens/CameraScreen';
import TextInputScreen from './src/screens/TextInputScreen';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import CallScreen from './src/screens/CallScreen';


const Stack = createStackNavigator();


// const AppNavigator = () => {
// const {isAuthenticated} = useAuth();
       
  // return (
 
// {/* <Stack.Navigator initialRouteName={isAuthenticated ? 'Main' : 'Auth'}>
//   {!isAuthenticated ? (
//     <>
// <Stack.Screen name = 'Auth' component = {AuthLayout} options={{headerShown: false}} />
// <Stack.Screen name="SignUp" component={SignUp} options={{headerShown : false}} />
// <Stack.Screen name="SignIn" component={SignIn} options={{headerShown : false}} />
// </>
//   ) : (
//     // <> */}
//     <Stack.Navigator>
 
//   <Stack.Screen name='Main' component={MainScreen} />
// <Stack.Screen name='Chats' component={ChatsScreen} />
//     <Stack.Screen name='Chat' component={ChatScreen} />
//     <Stack.Screen name="Contacts" component={ContactsScreen} />
//     <Stack.Screen name ='Stories' component={StoriesScreen} />
//     <Stack.Screen name='Camera' component= {CameraScreen} />
//     <Stack.Screen name='TextInput' component={TextInputScreen} />
//     <Stack.Screen name= "Call Logs" component={CallScreen} />
  
// </Stack.Navigator>

//   );
// };

export default function App() {
  return (
    <AuthProvider>
      <View style= {styles.container}>
        <StatusBar style ='auto' />
        <NavigationContainer>
          <AuthLayout />
        </NavigationContainer>
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',

    paddingVertical: 50,
  },
});