// screens/DataStorageScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  Icon  from 'react-native-vector-icons/FontAwesome';
const DataStorageScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
      <Icon name='arrow-left' size={24} color="#000" onPress={() => navigation.goBack()}/>
      </View>
      <Text style={styles.item}>Swipe Right To Reply</Text>
      <Text style={styles.item}>Press Enter Key To Send</Text>
      <Text style={styles.item}>Silence Unknown Callers</Text>
      <Text style={styles.item}>Clear Message History</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 18,
    color: '#000',
  },
});

export default DataStorageScreen;

