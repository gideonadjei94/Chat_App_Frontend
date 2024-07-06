import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Touchable,
  StyleSheet,
  Alert,
} from "react-native";
import ChatListItem from "../components/ChatListItem";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { FloatingAction } from "react-native-floating-action";
import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useFocusEffect } from "@react-navigation/native";

const ChatsScreen = ({ route }) => {
  const { userId, user } = route.params;
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const [socket, setSocket] = useState(null);

  const fetchChats = async () => {
    fetch(`http://10.132.62.10:8800/api/chats/getchats/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch chats");
        }
        return response.json();
      })
      .then((data) => {
        setChats(data);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  //fetchChats();

  const actions = [
    {
      text: "New Contact",
      icon: <Icon name="user-plus" size={20} color="#fff" />,
      name: "bt_new_contact",
      position: 1,
    },
  ];
  useFocusEffect(
    useCallback(() => {
      fetchChats();
    }, [])
  );

  useEffect(() => {
    const socket = io("http://10.132.62.10:3000");
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon
            name="arrow-left"
            size={24}
            color="#000"
            onPress={() => navigation.navigate("Main", { user: user })}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity>
          <Icon
            name="camera"
            size={24}
            color="#000"
            onPress={() => navigation.navigate("Camera")}
            contentContainerStyle={styles.list}
          />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={chats}
          renderItem={({ item }) =>
            item.messages !== null ? (
              <ChatListItem chat={item} userId={userId} />
            ) : (
              <View />
            )
          }
        />
      </View>
      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          navigation.navigate("NewContact", { user: user });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  list: {
    padding: 5,
  },
});

export default ChatsScreen;
