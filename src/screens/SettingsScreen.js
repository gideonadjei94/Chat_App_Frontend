import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import ProfileView from "../components/ProfileView";

const SettingsScreen = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <ProfileView name={user.username} />
        <View>
          <Text style={styles.profileName}>{user.username}</Text>
          <Text style={styles.profileRole}>Hey There! I'm using Wexy</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Account", { user: user })}
      >
        <Icon name="key" size={20} color="#4F8EF7" style={styles.icon} />
        <Text style={styles.itemText}>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("starredMessage")}
      >
        <Icon name="star" size={20} color="#FFC107" style={styles.icon} />
        <Text style={styles.itemText}>Starred Message</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Notification", { user: user })}
      >
        <Icon name="bell" size={20} color="#green" style={styles.icon} />
        <Text style={styles.itemText}>Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Data")}
      >
        <Icon name="bar-chart" size={20} color="#FF5722" style={styles.icon} />
        <Text style={styles.itemText}>Data and Storage Usage</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Help")}
      >
        <Icon
          name="info-circle"
          size={20}
          color="#2196F3"
          style={styles.icon}
        />
        <Text style={styles.itemText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Help")}
      >
        <Icon name="image" size={20} color="#2196F3" style={styles.icon} />
        <Text style={styles.itemText}>Media</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => navigation.goBack()}>
        <Icon name="comment" size={20} color="E91E63" style={styles.icon} />
        <Text style={styles.itemText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddding: 20,
    backgroundColor: "#f9f9f9",
    //   borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileRole: {
    fontSize: 14,
    color: "#888",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  icon: {
    fontSize: 24,
    width: 30,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
});

export default SettingsScreen;
