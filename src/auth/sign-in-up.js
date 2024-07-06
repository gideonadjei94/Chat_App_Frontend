import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components_home/CustomButton';
import { useNavigation } from '@react-navigation/native';

const SingInUp = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Text>Are you new here?</Text>
         <TouchableOpacity
         style={styles.button}
         onPress={() => navigation.navigate('SignUp')}
         >
          <Text style={styles.buttonText}>Sign Up</Text>
         </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Text>Already have an account?</Text>
          <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
   marginVertical: 20,
   alignItems: 'center',
  },
  button: {
   backgroundColor: '#00bfff',
   paddingVertical: 10,
   paddingHorizontal: 20,
   borderRadius: 5,
   marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  }
})

export default SingInUp