import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react';
import { images } from '../constants';

const ConfirmDeleteScreen = () => {
  return (
    <View style ={styles.container}>
      <View style={styles.iconContainer}>
       <Image source={images.wexy} resizeMode="contain" style={styles.logo} />
       </View>
      <Text style={styles.heading}>Deleting Your WEX</Text>
      <Text style={styles.message}>Please eneter password to delete account</Text>
   <TextInput
   style={styles.input}
   placeholder='Password'
   secureTextEntry
   />
   <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>NEXT</Text>
   </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#B2BEB5',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
        paddingLeft: 10,
    },
    logo: {
      width: 115, 
      height: 115, 
      resizeMode: 'contain',
      borderRadius: 25,
    },
    iconContainer: {
      marginBottom: 20,
    },
    heading:{
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#fff',
    }
});

export default ConfirmDeleteScreen;