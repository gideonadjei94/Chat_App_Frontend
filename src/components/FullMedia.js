import {
  Alert,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Video } from "expo-av";
import { Image } from "expo-image";
import { FontAwesome5 } from "@expo/vector-icons";
import PhotoView from "react-native-photo-view";
import { useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";

const FullMedia = ({ route }) => {
  const navigation = useNavigation();
  const { uri } = route.params;

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const handlePlayPause = () => {
    if (isPlaying) {
      ref.current.pauseAsync();
    } else {
      ref.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const saveMedia = async (uri) => {
    try {
      await MediaLibrary.createAssetAsync(uri);
      alert("Media saved..");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLongPress = (uri) => {
    Alert.alert(
      "Save",
      "Tap on save to the media on your device"[
        ({
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Save",
          onPress: () => saveMedia(uri),
        })
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FontAwesome5
        name="chevron-left"
        size={26}
        color="#00bfff"
        onPress={() => navigation.goBack()}
      />
      {uri?.endsWith(".mp4") ? (
        <View style={styles.contentContainer}>
          <TouchableOpacity onLongPress={() => handleLongPress(uri)}>
            <Video
              ref={ref}
              style={styles.video}
              source={{ uri }}
              //useNativeControls
              resizeMode="cover"
              isLooping
              onPlaybackStatusUpdate={(status) =>
                setIsPlaying(status.isPlaying)
              }
            />
            {/* <FontAwesome5
            name={isPlaying ? "pause" : "play"}
            onPress={handlePlayPause}
          /> */}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <TouchableOpacity onLongPress={() => handleLongPress(uri)}>
            <Image
              style={styles.image}
              source={uri}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FullMedia;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    margin: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: "100%",
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
});
