import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const CameraScreen = () => {
  const navigation = useNavigation();
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.absoluteFill} facing={facing}>
        <View style={styles.topBar}>
          <TouchableOpacity>
            <Icon
              name="arrow-left"
              size={24}
              color="#fff"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="bolt" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={toggleCameraFacing}
        >
          <Icon name="camera-reverse" size={24} color="white" />
        </TouchableOpacity>
        <View styles={styles.bottomBar}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="image" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton}>
            <Icon
              name="circle"
              size={30}
              color="#fff"
              onPress={toggleCameraFacing}
            />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  captureButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default CameraScreen;
