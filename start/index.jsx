// import React, { useEffect } from 'react';
// import { ScrollView, Text, View, Image } from "react-native";
// import { StatusBar } from 'expo-status-bar';
// import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import images from '../src/constants/images'

// export default function App() {
//     const navigation = useNavigation();
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.push('SignInUp');
//     }, 2000);

//     return () => clearTimeout(timer); 
//   }, []);

//   return (
//     <SafeAreaView className="bg-white h-full">
//       <ScrollView contentContainerStyle={{height: '100%'}}>
//         <View className="w-full justify-center items-center min-h-[85vh] px-4">
//           <Image source={images.wexy} />

//           <Text className="" style={{ color: "#000000" }} >
//             Made By 
//             <Image />
//           </Text>
//         </View>
//       </ScrollView>
//       <StatusBar className="bg-black" backgroundColor='#161622' style='light'/>
//     </SafeAreaView>
//   );
// }






















// // import 'react-native-reanimated';
// // import { Text, View } from "react-native";
// // import { StatusBar } from 'expo-status-bar';
// // import { Link } from 'expo-router';
// // export default function app() {
// //   return (
// //     <View className="flex-1 items-center justify-center bg-white">
// //     <Text className="text-3xl font-pblack">
// //       Wexy!
// //     </Text>
// //     <StatusBar style="auto" />
// //     <Link href='/profile' style={{ color: 'blue'}}>Go to Profile</Link>
// //   </View>
// //   );
// // }