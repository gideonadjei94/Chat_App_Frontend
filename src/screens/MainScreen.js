import { View, Image, StyleSheet } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import LocalImage from "../../assets/images1/All.png";
import { useNavigation } from "@react-navigation/native";

function MainScreen({ route }) {
  const { user } = route.params;
  const navigation = useNavigation();
  return (
    // <View >
    //     <Image
    //     source={require("../../assets/images/trial1.jpg")}
    //     style={styles.header}
    //     />
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <MaterialIcons
          name="chat"
          size={30}
          color="#fff"
          style={styles.icon}
          onPress={() =>
            navigation.navigate("Chats", { userId: user._id, user: user })
          }
        />
        <MaterialIcons
          name="call"
          size={30}
          color="#fff"
          style={styles.icon}
          onPress={() => navigation.navigate("Call")}
        />
        <MaterialIcons
          name="settings"
          size={30}
          color="#fff"
          style={styles.icon}
          onPress={() => navigation.navigate("Settings", { user: user })}
        />
        <MaterialIcons
          name="loupe"
          size={30}
          color="#fff"
          style={styles.icon}
          onPress={() => navigation.navigate("Stories")}
        />
      </View>
      <View style={styles.mainContent}>
        <Image source={LocalImage} style={styles.image} />
      </View>
    </View>
    //    </View>
  );
}

const styles = StyleSheet.create({
  // header: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  // },
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 60,
    backgroundColor: "#00bcd4",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginVertical: 20,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default MainScreen;
