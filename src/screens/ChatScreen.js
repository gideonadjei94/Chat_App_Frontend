import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import bg from "../../assets/images1/ViberIcon.jpg";

import Message from "../components/Message";
import InputBox from "../components/InputBox";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { io } from "socket.io-client";
import { useFocusEffect } from "@react-navigation/native";

const ChatScreen = ({ route }) => {
  const { chatId, name, Id, member } = route.params;
  const [send, setSend] = useState(false);
  const [textMessage, setTextMessage] = useState({
    message: "",
  });
  const [newMessage, setNewMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const [socket, setSocket] = useState(null);

  const handleChange = (name, value) => {
    setTextMessage({ ...textMessage, [name]: value });
  };

  useEffect(() => {
    const socket = io("http://10.132.62.10:3000");
    setSocket(socket);

    socket.emit("register", Id);

    socket.on("getMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchMessages = async () => {
    fetch(`http://10.132.62.10:8800/api/messages/getmessages/${Id}/${chatId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch messages");
        }
        return response.json();
      })
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };
  useEffect(() => {
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    fetch(`http://10.132.62.10:8800/api/messages/create/${Id}/${member}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(textMessage),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not send default message");
        }
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        setNewMessage(data);
        setTextMessage("");
        socket.emit("chat-message", { ...data, receiverId: member });
        fetchMessages();
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };
  // useFocusEffect(
  //   useCallback(() => {
  //     fetchMessages();
  //   })
  // );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.bg}
    >
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon
            name="arrow-left"
            size={24}
            color="#000"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{name}</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Icon
              name="phone"
              size={24}
              color="#000"
              onPress={() => navigation.navigate("Voice")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="video-camera"
              size={24}
              color="#000"
              onPress={() => navigation.navigate("Video")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="camera"
              size={24}
              color="#000"
              onPress={() => navigation.navigate("Camera")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ImageBackground source={bg} style={styles.bg}>
        <ScrollView>
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <Message message={item} userId={Id} name={name} />
            )}
            style={styles.list}
          />
        </ScrollView>
        <View style={styles.container}>
          {/* Icon */}
          <AntDesign name="plus" size={24} color="royal blue" />
          {/* Text Input */}
          <TextInput
            value={textMessage}
            onChangeText={(text) => handleChange("message", text)}
            style={styles.input}
            placeholder=" type your message..."
          />
          {/* Icon */}
          <MaterialIcons
            onPress={sendMessage}
            name="send"
            size={24}
            color="blue"
            style={styles.send}
          />
        </View>
        {/* <InputBox member={member} userId={Id} chatId={chatId} /> */}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  list: {
    padding: 10,
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
    fontSize: 18,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 150,
  },
  container: {
    margin: 0,
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    padding: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },

  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    fontSize: 16,

    borderRadius: 50,
    borderColor: "lightgray",
    borderWidth: StyleSheet.hairlineWidth,
  },
  send: {
    backgroundColor: "royal blue",
    padding: 7,
    borderRadius: 15,
    overflow: "hidden",
    marginLeft: 30,
  },
});

export default ChatScreen;
