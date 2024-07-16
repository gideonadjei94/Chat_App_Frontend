import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Audio, AVPlaybackStatus } from "expo-av";
import ProfileView from "./ProfileView";

const AudioList = ({ uri, message, userId, user }) => {
  const [sound, setSound] = useState();
  const [status, setStatus] = useState([]);
  const isMyMessage = () => {
    return message.senderId === userId && message.receiverId !== userId;
  };
  const playSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true },
      pbStatusUpdate
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  };

  const pbStatusUpdate = async (AVPlaybackStatus) => {
    setStatus(AVPlaybackStatus);
    console.log(AVPlaybackStatus);
  };
  const isPlaying = AVPlaybackStatus?.isLoaded
    ? AVPlaybackStatus?.isPlaying
    : false;
  const duration = AVPlaybackStatus?.durationMillis || 1;
  // const position = AVPlaybackStatus?.isLoaded
  //   ? AVPlaybackStatus?.positionMillis
  //   : 0;
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  const formatMillis = (number) => {
    const minutes = Math.floor(number / (1000 * 60));
    const seconds = Math.floor((number % (1000 * 60)) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
      <FontAwesome5
        name={isPlaying ? "pause" : "play"}
        size={30}
        color={"gray"}
        onPress={playSound}
      />
      <View style={styles.playbackContainer}>
        <Text styles={styles.playbackBackground}>Audio</Text>

        {/* <View style={styles.playbackBackground} />
        <View
          style={[styles.playbackIndicator, { left: `${progress * 100}%` }]}
        /> */}

        <Text
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            color: "gray",
          }}
        >
          {formatMillis(duration)}
        </Text>
      </View>
    </View>
  );
};

export default AudioList;

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
  playbackBackground: {
    height: 3,
    backgroundColor: "gainsboro",
  },
  playbackIndicator: {
    width: 12,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: "#00bfff",
    position: "absolute",
  },
});
