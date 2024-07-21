import { useCallback, useEffect, useRef, useState } from "react";
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
  Image,
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
import * as DocumentPicker from "expo-document-picker";
import MediaList from "../components/MediaList";
import * as FileSystem from "expo-file-system";

const ChatScreen = ({ route }) => {
  const { chatId, name, Id, member, user } = route.params;
  //const [send, setSend] = useState(false);
  const [textMessage, setTextMessage] = useState({
    message: "",
    type: "text",
  });
  const [newMessage, setNewMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const [socket, setSocket] = useState(null);
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const scrollViewRef = useRef();

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

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

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
    upLoadAudio(uri);
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
  }, [navigation]);

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
        type: "audio",
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
        setTextMessage({ message: "", type: "text" });
        socket.emit("chat-message", { ...data, receiverId: member });
        fetchMessages();
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };
  const upLoadAudio = async (uri) => {
    const formData = new FormData();
    formData.append("file", {
      uri,
      name: "audio.m4a",
      type: "audio/m4a",
    });

    fetch("http://10.132.62.10:8800/api/user/upload", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not upload file");
        }
        return response.json();
      })
      .then((data) => {
        const audioUri = `http://10.132.62.10:8800/api/user/audio/${data.file.filename}`;
        sendAudio(audioUri);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleLongPress = (messageId) => {
    Alert.alert(
      "Delete Message",
      "Are you sure you want to delete this message?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteMessage(messageId),
        },
      ]
    );
  };

  const deleteMessage = async (messageId) => {
    fetch(
      `http://10.132.62.10:8800/api/messages/delete/${Id}/${chatId}/${messageId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not delete message");
        }
        return response.json();
      })
      .then((data) => {
        Alert.alert("Message deleted");
        fetchMessages();
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" }); // Pick any type of file

      // if (result.type === "success") {
      Alert.alert(result);
      // Handle the selected document
      // console.log(result.uri);
      // Example: You can save it to media state or handle it as needed
      //setMedia([...media, { uri: result.uri }]); // Adding selected media to state
      // }
    } catch (error) {
      console.log("Document picker error:", error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchMessages();
    }, [])
  );

  return (
    <KeyboardAvoidingView
      //behavior={Platform.OS === "ios" ? "padding" : "height"}
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
              item.type === "text" ? (
                <TouchableOpacity onLongPress={() => handleLongPress(item._id)}>
                  <Message
                    message={item}
                    userId={Id}
                    name={name}
                    style={styles.list}
                  />
                </TouchableOpacity>
              ) : item.type === "audio" ? (
                <TouchableOpacity onLongPress={() => handleLongPress(item._id)}>
                  <AudioList
                    uri={item.message}
                    message={item}
                    userId={Id}
                    user={user}
                  />
                </TouchableOpacity>
              ) : (
                <MediaList
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
          <FontAwesome5
            name="paperclip"
            size={22}
            color="gray"
            onPress={pickDocument}
          />
          <FontAwesome5
            name="image"
            size={22}
            color="gray"
            onPress={() =>
              navigation.navigate("Media", { chatId, name, Id, member, user })
            }
          />
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
    width: 115,
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
