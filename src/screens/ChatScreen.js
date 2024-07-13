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
import { Audio } from "expo-av";
import AudioList from "../components/AudioList";
import { FontAwesome5 } from "@expo/vector-icons";

const ChatScreen = ({ route }) => {
  const { chatId, name, Id, member, user } = route.params;
  //const [send, setSend] = useState(false);
  const [textMessage, setTextMessage] = useState({
    message: "",
    isAudio: false,
  });
  const [newMessage, setNewMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const [socket, setSocket] = useState(null);
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

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

  // start recording
  const startRecording = async () => {
    try {
      if (permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };
  //end recording
  const stopRecording = async () => {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    sendAudio(uri);
    //console.log("Recording stopped and stored at", uri);
  };
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
  const sendAudio = async (uri) => {
    fetch(`http://10.132.62.10:8800/api/messages/create/${Id}/${member}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: uri,
        isAudio: true,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not send  message");
        }
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        setNewMessage(data);
        setTextMessage({ message: "", isAudio: false });
        socket.emit("chat-message", { ...data, receiverId: member });
        fetchMessages();
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.bg}
    >
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon
            name="chevron-left"
            size={24}
            color="#00bfff"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{name}</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Icon
              name="phone"
              size={24}
              color="#00bfff"
              onPress={() =>
                navigation.navigate("Voice", { chatId, name, Id, member })
              }
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="video-camera"
              size={24}
              color="#00bfff"
              onPress={() =>
                navigation.navigate("Video", { chatId, name, Id, member })
              }
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="camera"
              size={24}
              color="#00bfff"
              onPress={() => navigation.navigate("Camera")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ImageBackground source={bg} style={styles.bg}>
        <ScrollView>
          <FlatList
            data={messages}
            renderItem={({ item }) =>
              !item.isAudio ? (
                <Message
                  message={item}
                  userId={Id}
                  name={name}
                  style={styles.list}
                />
              ) : (
                <AudioList
                  uri={item.message}
                  message={item}
                  userId={Id}
                  user={user}
                />
              )
            }
            keyExtractor={(item) => item._id}
            //style={!item.isAudio ? styles.list : ""}
          />
        </ScrollView>
        <View style={styles.container}>
          <AntDesign name="plus" size={24} color="#00bfff" />
          <TextInput
            value={textMessage}
            onChangeText={(text) => handleChange("message", text)}
            style={styles.input}
            placeholder={
              recording ? "Recording message..." : "Type your message..."
            }
          />
          <FontAwesome5 name="paperclip" size={22} color="gray" />
          <FontAwesome5 name="image" size={22} color="gray" />
          {textMessage.message ? (
            <FontAwesome5
              name="paper-plane"
              size={25}
              color="#00bfff"
              onPress={sendMessage}
            />
          ) : (
            <FontAwesome5
              name="microphone"
              size={recording ? 28 : 24}
              color={recording ? "red" : "#00bfff"}
              onPress={recording ? stopRecording : startRecording}
            />
          )}
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
    backgroundColor: "white",
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 15,
    maxWidth: "100%",
  },

  input: {
    flex: 1,
    //backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    fontSize: 16,

    // borderRadius: 50,
    // borderColor: "lightgray",
    // borderWidth: StyleSheet.hairlineWidth,
  },
  send: {
    backgroundColor: "royal blue",
    padding: 7,
    borderRadius: 15,
    overflow: "hidden",
    marginLeft: 7,
  },
});

export default ChatScreen;
