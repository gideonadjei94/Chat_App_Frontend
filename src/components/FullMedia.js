import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const FullMedia = ({ route }) => {
  const { uri } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: uri }}
        width={"100%"}
        height={"100%"}
        style={styles.bg}
      />
    </View>
  );
};

export default FullMedia;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    margin: 10,
  },
});
