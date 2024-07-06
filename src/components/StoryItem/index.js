import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const StoryItem = ({story}) => {
const navigation = useNavigation();

    return(
    <View style={styles.storyItemContainer}>
        <Image source={{uri: story.image}} style={styles.avatar} />
        <View style={styles.storyDetails}>
            <Text style={styles.storyName}>{story.name}</Text>
            <Text style={styles.StoryStatus}>{story.status}</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
            <Icon name="camera" size={20} color='#000' onPress={() => navigation.navigate('Camera')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
            <Icon name="pencil" size={20} color="#000" onPress={() => navigation.navigate('TextInput')} />
        </TouchableOpacity>
    </View>
    )
    };

    const styles = StyleSheet.create ({
        storyItemContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#e0e0e0',
        },
        avatar: {
            width: 30,
            height: 40,
            borderRadius: 20,
            marginRight: 10,
        },
        storyDetails: {
            flex: 1,
        },
        storyName: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        StoryStatus: {
            color: 'gray',
        },
        iconButton: {
            paddingHorizontal: 10,
        },
    })

export default StoryItem