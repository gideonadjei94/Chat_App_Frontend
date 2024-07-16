import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigation } from "@react-navigation/native";

dayjs.extend(relativeTime);

const MediaList = ({ uri, message, userId, user }) => {
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
          navigation.navigate("Full", { uri });
        }}
      >
        <View style={styles.playbackContainer}>
          <Image source={{ uri: uri }} width={200} height={400} />
          <Text style={styles.time}>
            {dayjs(message.timestamp).format("HH:mm")}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MediaList;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 15,
    maxWidth: 220,
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
    height: 430,
    justifyContent: "center",
  },
  time: {
    color: "gray",
    alignSelf: "flex-end",
  },
});
