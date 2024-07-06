import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import {FloatingAction} from 'react-native-floating-action';
import callLogs from '../../assets/data/callLogs.json';



const CallLogItem = ({log}) => {
<View style={styles.itemContainer}>
    <Image source={{uri: log.avatar}} style={styles.avatar} />
    <View style={styles.details}>
        <Text style={styles.name}>{log.name}</Text>
        <View style={styles.logDetails}>
            <Icon name={log.type === 'outgoing' ? 'phone' : log.type === 'incoming' ? 'phone' : 'phone'} size={16} color={log.type === 'missed' ? 'red' : 'gray'} />
            <Text style={[styles.type, log.type === 'missed' && {color: 'red'}]} > {log.type}</Text>
            <Text style={styles.date}>{log.date}</Text>
        </View>
    </View>
</View>
};

const CallLogsScreen = () => {
    const actions = [
        {
            text: "New Call",
            icon: <Icon name="phone" size={20} color="#fff" />,
            name:"bt_new_call",
            position: 1
        },
        {
            text: "New Contact",
            icon: <Icon name="user-plus" size={20} color="#fff" />,
            name: "bt_new_contact",
            position: 2
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Icon name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Call Logs</Text>
            </View>
            <FlatList
            data={callLogs}
            renderItem={({item}) => <CallLogItem log={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            />
            <FloatingAction
            actions = {actions}
            onPressItem={name => {
                console.log('Selected button:$(name');
            }}
            />
        </View>
    );
};

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    list: {
        padding: 10,
    
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    avatar: {
        width: 40,
        heigth: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    logDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    type: {
        marginLeft: 5,
        color: 'gray',
    },
    date: {
        marginLeft: 10,
        color: 'gray',
    }
})

export default CallLogsScreen;