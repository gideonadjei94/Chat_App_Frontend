import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import  Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const VideoCallScreen = () => {
const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
                <Icon name='arrow-left' size={24} color='#fff' onPress={() => navigation.goBack()} />
            </TouchableOpacity>
        </View>
        <View style={styles.videoContainer}>
            <Image
            source={(require('../../assets/images1/thumbnail.png'))}
            />
            <Image
            source={(require("../../assets/images1/ViberIcon.jpg") )}
            style={styles.overlayVideo}
            />
        </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.micButton]}>
            <Icon name='microphone-slash' size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style= {[styles.button, styles.cameraButton]}>
            <Icon name='video-camera' size={24} color='#fff' />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.photoButton]}>
            <Icon name='camera' size={24} color='#fff' />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.endCallButton]}>
            <Icon name='phone' size={24} color='#fff' onPress={() => navigation.goBack()}/>
        </TouchableOpacity>
    </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0F7FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddding: 10,
        backgroundColor: '#00BCD4',
    },
    backButton: {
        justifyContent: 'center',
    },
    batteryIcon: {
        marginLeft: 10,
    },
    videoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    mainVideo: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    overlayVideo: {
        width: 100,
        heigth: 100,
        position: 'absolute',
        top: 20,
        right: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#00BCD4',
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
      },
      micButton: {
        backgroundColor: '#FFC107',
      },
      cameraButton: {
        backgroundColor: '#8BC34A',
      },
      photoButton: {
        backgroundColor: '#2196F3',
      },
      endCallButton: {
        backgroundColor: '#F44336',
      },
})

export default VideoCallScreen