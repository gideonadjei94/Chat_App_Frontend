import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import  Icon  from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const PrivacyScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
       <View>
      <Icon name='arrow-left' size={24} color="#000" onPress={() => navigation.goBack()}/>
      </View>
      <View style={styles.item}>
        <Icon name='lock' size={20} color='#000'style={styles.icon} />
        <Text style={styles.itemText}>Swipe right to reply</Text>
      </View>
      <View style={styles.item}>
        <Icon name='group' size={20} color='#000' style={styles.icon} />
        <Text style={styles.itemText}>Silence unknown callers</Text>
      </View>
      <View style={styles.item}>
        <Icon name='user-circle' size={20} color='#000' style={styles.icon} />
        <Text style={styles.itemText}>Show your profile picture</Text>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E0F7F4",
        padding: 16,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    icon: {
        marginRight: 16,
    },
    itemText: {
        fontSize: 18,
        color: '#000',
    },
});

export default PrivacyScreen