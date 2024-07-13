import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import ProfileView from "../components/ProfileView";
//import { RTCView, mediaDevices, RTCPeerConnection } from "react-native-webrtc";
//import io from "socket.io-client";

const VideoCallScreen = ({ route }) => {
  const { chatId, name, Id, member } = route.params;
  const navigation = useNavigation();
  const { roomId, recipientId } = route.params;
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  return (
    <View style={styles.container}>
      <View style={{ marginLeft: 5 }}>
        <TouchableOpacity style={styles.backButton}>
          <Icon
            name="arrow-left"
            size={30}
            color="#fff"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.videoContainer}>
        {/* <Image source={require("../../assets/images1/thumbnail.png")} />
        <Image
          source={require("../../assets/images1/ViberIcon.jpg")}
          style={styles.overlayVideo}
        /> */}
        <ProfileView name={name} styles={{ width: 200, height: 40 }} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.endCallButton]}>
          <Icon
            name="phone"
            size={24}
            color="#fff"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#000",
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  endCallButton: {
    backgroundColor: "#F44336",
  },
});

export default VideoCallScreen;
