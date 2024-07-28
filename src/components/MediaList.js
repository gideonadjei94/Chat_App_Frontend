import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

dayjs.extend(relativeTime);

const MediaList = ({ uri, message, userId, user }) => {
  const navigation = useNavigation();
  const [seen, setSeen] = useState(false);
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
      {seen ? (
        <FontAwesome5 name="clock" size={22} color="gray" />
      ) : (
        <View style={styles.sq} />
      )}
      {/* <FontAwesome5 name="square" color="#00bfff" size={30} /> */}

      <TouchableOpacity
        onPress={() => {
          if (!seen) {
            navigation.navigate("Full", { uri });
            setSeen(true);
          } else {
            Alert.alert("Sorry", "Media already viewed, Ask sender to resend");
          }
        }}
      >
        <View style={styles.playbackContainer}>
          <Text>Media</Text>
          {/* <Image source={{ uri: uri }} width={200} height={400} /> */}
          {/* <Text style={styles.time}>
            {dayjs(message.timestamp).format("HH:mm")}
          </Text> */}
        </View>
      </TouchableOpacity>
      <Text
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          color: "gray",
        }}
      >
        {dayjs(message.timestamp).format("HH:mm")}
      </Text>
    </View>
  );
};

export default MediaList;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 15,
    width: 125,
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
  sq: {
    width: 15,
    height: 15,
    backgroundColor: "#00bfff",
    borderRadius: 2,
  },
  playbackBackground: {
    // fontSize: 15,
    // color: "black",
  },
  playbackIndicator: {
    width: 12,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: "#00bfff",
    position: "absolute",
  },
});
