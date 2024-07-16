import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// import * as FileSystem from "expo-file-system";

const MediaScreen = ({ route }) => {
  const { chatId, name, Id, member, user } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [media, setMedia] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    const getMedia = async () => {
      if (hasPermission) {
        const mediaData = await MediaLibrary.getAssetsAsync({
          first: 100, // Number of media files to fetch
          mediaType: ["photo", "video"], // Types of media to fetch
        });
        setMedia(mediaData.assets);
      }
    };

    getMedia();
  }, [hasPermission]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to media library</Text>;
  }
  const handleLongPress = (uri) => {
    Alert.alert(
      "Send Media",
      "Tap on SEND to send media",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Send",
          onPress: () => upLoadMedia(uri),
        },
      ],
      { cancelable: true }
    );
  };
  const upLoadMedia = async (uri) => {
    const formData = new FormData();
    formData.append("file", {
      uri,
      name: uri.split("/").pop(),
      type: uri.endsWith(".mp4") ? "video/mp4" : "image/jpeg",
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
        const mediaUri = `http://10.132.62.10:8800/api/user/audio/${data.file.filename}`;
        sendMedia(mediaUri);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const sendMedia = async (uri) => {
    fetch(`http://10.132.62.10:8800/api/messages/create/${Id}/${member}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: uri,
        type: "media",
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
        //setNewMessage(data);
        //setTextMessage({ message: "", type: "text" });
        // socket.emit("chat-message", { ...data, receiverId: member });
        //fetchMessages();
        console.log(data);
        alert("Media sent..");
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome5
          name="chevron-left"
          size={26}
          color="#00bfff"
          style={styles.nav}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <FlatList
          data={media}
          keyExtractor={(item) => item.id}
          numColumns={4}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => {
                handleLongPress(item.uri);
              }}
            >
              <Image source={{ uri: item.uri }} style={styles.mediaItem} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  mediaItem: {
    width: 100,
    height: 100,
    margin: 2,
  },
  nav: {
    marginHorizontal: 7,
    marginVertical: 5,
    left: 0,
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  sendbt: {
    width: 90,
    height: 90,
    backgroundColor: "red",
  },
});

export default MediaScreen;
