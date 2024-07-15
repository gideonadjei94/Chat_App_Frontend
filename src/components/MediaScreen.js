import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MediaScreen = () => {
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

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity>
        <FontAwesome5
          name="chevron-left"
          size={26}
          color="#00bfff"
          onPress={() => navigation.goBack()}
          style={styles.nav}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <FlatList
          data={media}
          keyExtractor={(item) => item.id}
          numColumns={4}
          renderItem={({ item }) => (
            <Image source={{ uri: item.uri }} style={styles.mediaItem} />
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
});

export default MediaScreen;
