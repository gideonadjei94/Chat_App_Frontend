import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import FileViewer from "react-native-file-viewer";

const FileList = ({ uri, message, userId, user }) => {
  const navigation = useNavigation();
  const isMyMessage = () => {
    return message.senderId === userId && message.receiverId !== userId;
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMyMessage() ? "#DCF8C5" : "white",
          alignSelf: isMyMessage() ? "flex-end" : "flex-start",
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          FileViewer.open(uri)
            .then(() => {
              console.log("File Opened");
            })
            .catch((err) => {
              console.error(err.message);
            });
        }}
      >
        <FontAwesome5 name={file} color="red" size={30} />
        <View style={styles.playbackContainer}>
          <Text>File</Text>
          <Text style={styles.time}>
            {dayjs(message.timestamp).format("HH:mm")}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FileList;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 15,
    maxWidth: "30%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  playbackContainer: {
    flex: 1,
    height: 50,
    justifyContent: "center",
  },
  time: {
    color: "gray",
    alignSelf: "flex-end",
  },
});
