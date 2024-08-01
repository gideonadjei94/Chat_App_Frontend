import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Backend_URL } from "../auth/config";

const NewContactScreen = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();

  const [contact, setContact] = useState({
    contactNum: "",
  });
  const handleChange = (name, value) => {
    setContact({ ...contact, [name]: value });
  };

  const addcontact = async () => {
    fetch(`${Backend_URL}user/addcontact/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("This Contact is not on Wexy");
        }
        return response.json();
      })
      .then((data) => {
        Alert.alert("Success", "Done");
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  // useEffect(() => {
  //   Alert.alert("Messsage", user._id);
  // });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5
          name="chevron-left"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>New Contact</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}></View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="phone" size={24} color="black" />

          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Phone"
            value={contact.contactNum}
            placeholderTextColor="#999"
            onChangeText={(text) => handleChange("contactNum", text)}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.addInfo}>Add Information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={addcontact}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 8,
  },
  addInfo: {
    color: "green",
    marginTop: 16,
  },
  saveButton: {
    backgroundColor: "green",
    borderRadius: 5,
    marginTop: 32,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default NewContactScreen;
