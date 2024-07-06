import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { images } from "../constants";

const DeleteAccountScreen = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={images.wexy} resizeMode="contain" style={styles.logo} />
      </View>
      <Text stylele={styles.title}>Deleting Your WEX</Text>
      <Text style={styles.message}>
        Continuing with this procedure is going to deactivate this account,
        making it invisible to others. But if you do not log in to thiis account
        after 30 days, it will br deleted permanently.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Confirm")}
      >
        <Text style={styles.buttonText}>
          Are you sure you want to proceed?{" "}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Cancel This Procedure </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B2BEB5",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  button: {
    padding: 15,
    backgroundColor: "#00BCD4",
    borderRadius: 10,
    marginVertical: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  message: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  logo: {
    width: 115,
    height: 115,
    resizeMode: "contain",
    borderRadius: 25,
  },
  iconContainer: {
    marginBottom: 20,
  },
});

export default DeleteAccountScreen;
