import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TextInputScreen = () => {

const [text, setText] = useState('');
    
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton}>
            <Icon name= 'close' size={24} color='#fff' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
            <Icon name='title' size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
            <Icon name="palette" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <TextInput
      style={styles.input}
      placeholder="Express your thoughts"
      placeholderTextColor="#fff"
      value={text}
      onChangeText={setText}
      multiline
      textAlignVertical='top'
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEFA',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#0000FF',
    },
    iconButton: {
        padding: 10,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 18,
        padding: 20,
        justifyContent: 'cenetr',
        alignItems: 'center',
    },
});

export default TextInputScreen