import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Camera, CameraType } from "expo-camera/legacy";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import { FontAwesome5 } from "@expo/vector-icons";

const CameraScreen = () => {
  const navigation = useNavigation();
  const [hasPersmission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert("Picture Saved..");
        setImage(null);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  if (hasPersmission === false) {
    return <Text>No Access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          type={type}
          FlashMode={flash}
          ref={cameraRef}
          style={styles.camera}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 30,
            }}
          >
            <FontAwesome5
              name="retweet"
              size={30}
              color="white"
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <FontAwesome5
              name="bolt"
              size={30}
              color={
                flash === Camera.Constants.FlashMode.off ? "gray" : "white"
              }
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            />
          </View>
          <View style={styles.CaptureBg}>
            <View style={styles.Capture}>
              <FontAwesome5
                name="camera"
                size={40}
                color="black"
                onPress={takePicture}
              />
            </View>
          </View>
        </Camera>
      ) : (
        <View style={styles.container}>
          <Image source={{ uri: image }} style={styles.camera} />
          <TouchableOpacity onPress={() => setImage(null)}>
            <View style={styles.BL}>
              <FontAwesome5 name="retweet" size={30} color="white" />
              <Text style={{ fontSize: 18, color: "white", marginLeft: 5 }}>
                Re-take
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={savePicture}>
            <View style={styles.BR}>
              <FontAwesome5 name="check" size={26} color="white" />
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  marginLeft: 5,
                  marginRight: 30,
                }}
              >
                Save
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    borderRadius: 5,
  },
  CaptureBg: {
    height: 80,
    width: 80,
    flexDirection: "column",
    top: "75%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 50,
    left: "40%",
    borderColor: "red",
  },
  Capture: {
    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 50,
  },
  BL: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: 50,
    width: "48%",
    marginLeft: 5,
    marginBottom: 15,
    alignSelf: "flex-start",
    position: "absolute",
    bottom: 0,
    borderRadius: 10,
  },
  BR: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: 50,
    width: "48%",
    marginBottom: 15,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 0,
    borderRadius: 10,
  },
});

export default CameraScreen;
