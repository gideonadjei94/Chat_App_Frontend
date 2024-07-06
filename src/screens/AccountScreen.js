import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const AccountScreen = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon
          name="arrow-left"
          size={24}
          color="#000"
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Privacy")}
      >
        <Icon name="lock" size={20} color="#000" style={styles.icon} />
        <Text style={styles.itemText}>Privacy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Delete", { user: user })}
      >
        <Icon name="trash" size={20} color="#000" style={styles.icon} />
        <Text style={styles.itemText}>Deactivate/Delete this account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F7FA",
    padding: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  icon: {
    marginRight: 16,
  },
  itemText: {
    fontSize: 18,
    color: "#000",
  },
});

export default AccountScreen;
