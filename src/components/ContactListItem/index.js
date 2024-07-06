import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const ContactListItem = ({user}) => {
    const navigation = useNavigation();

  return (
    <Pressable onPress={() => {}} style={Styles.container}>
    <Image source={{ uri: user.image}} style={styles.image} />

    <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
            {user.status}
        </Text>
    </View>
    </Pressable>
  );
};

const styles =StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        height: 70,
        alignItems: 'center',
    },
    Image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    name: {
        fontWeight: 'bold',
    },
    subTitle: {
        color: 'grey',
    },
})

export default ContactListItem;