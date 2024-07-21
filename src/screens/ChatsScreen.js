import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Touchable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import ChatListItem from "../components/ChatListItem";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { FloatingAction } from "react-native-floating-action";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import ProfileView from "../components/ProfileView";

const ChatsScreen = ({ route }) => {
  const { userId, user } = route.params;
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const [stories, setStories] = useState([]);

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
  const fetchStories = async () => {
    fetch("http://10.132.62.10:8800/api/stories/story", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch stories :(");
        }
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        setStories(data);
      })
      .catch((error) => Alert.alert(":(", error.message));
  };
  useEffect(() => {
    fetchStories();
  }, []);

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
      fetchStories();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon
            name="chevron-left"
            size={24}
            color="#00bfff"
            onPress={() => navigation.navigate("Main", { user: user })}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity>
          <Icon
            name="camera"
            size={24}
            color="#00bfff"
            onPress={() => navigation.navigate("Camera")}
            contentContainerStyle={styles.list}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.stories}>
        <TouchableOpacity
          onPress={() => navigation.navigate("StoryMedia", { userId, user })}
        >
          <View style={styles.addBg}>
            <View style={styles.stAddBg}>
              <FontAwesome5 name="plus" size={24} color="gray" />
            </View>
            <Text style={styles.Adtext}>Add a Story</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.storiesContainer}>
          <FlatList
            data={stories}
            horizontal
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Full", { uri: item.uri });
                }}
              >
                <View style={styles.st}>
                  <ProfileView
                    name={item.userId.username}
                    width={55}
                    height={55}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <View>
        <FlatList
          data={chats}
          renderItem={({ item }) =>
            item.messages !== null ? (
              <ScrollView>
                <ChatListItem chat={item} userId={userId} user={user} />
              </ScrollView>
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
  stories: {
    backgroundColor: "gainsboro",
    height: 95,
    marginBottom: 7,
    flexDirection: "row",
  },
  addBg: {
    flexDirection: "column",
    height: 90,
    width: 80,
  },
  stAddBg: {
    width: 62,
    height: 62,
    backgroundColor: "white",
    top: 10,
    left: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  Adtext: {
    fontSize: 13,
    top: 12,
    left: 5,
    fontWeight: "bold",
  },
  storiesContainer: {
    //backgroundColor: "red",
    flexDirection: "row",
    height: 70,
    width: "100%",
    top: 10,
  },
  st: {
    width: 60,
    height: 60,
    top: 5,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00bfff",
    borderRadius: 50,
    paddingLeft: 10,
  },
});

export default ChatsScreen;
