import { View, Text,StyleSheet,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import  Icon  from 'react-native-vector-icons/FontAwesome';

const VoiceCallScreen = () => {
const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <View style={styles.header}>
             <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
             <Icon name="arrow-left" size={24} color="#fff"  />
            </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
            <Image
          source={require("../../assets/lukas.jpeg")}
          style={styles.profileImage}
          />
          <Text style={styles.name}>Nana Kofi</Text>
          <Text style={styles.timer}>0:00</Text>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.acceptButton]}>
                <Text style={styles.buttonText}>📞</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.declineButton]}>
                <Text style={styles.buttonText}>📴</Text>
            </TouchableOpacity>
        </View>
     
    </View>
  )
};

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        position: 'absolute',
        top: 20,
        left: 10,
    },
    backArrow: {
        color: '#fff',
        fontSize: 24,
    },
    profileContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        color: '#fff',
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 50,
        justifyContent: 'space-between',
        width: '60%',
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    acceptButton: {
        backgroundColor: '#00f0ff',
    },
    declineButton: {
        backgroundColor: '#ff0000',
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
    },
});

export default VoiceCallScreen;