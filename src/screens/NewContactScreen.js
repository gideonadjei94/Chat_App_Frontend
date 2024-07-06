import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import CountryPicker from "react-native-country-picker-modal";
import { useNavigation } from "@react-navigation/native";

const NewContactScreen = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();
  const [countryCode, setCountryCode] = useState("IN");
  const [country, setCountry] = useState(null);
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(true);
  const [callingCode, setcallingCode] = useState("91");
  const [contact, setContact] = useState({
    contactNum: "",
    username: "",
  });
  const handleChange = (name, value) => {
    setContact({ ...contact, [name]: value });
  };

  const addcontact = async () => {
    fetch(`http://10.132.62.10:8800/api/user/addcontact/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not add contact");
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>New Contact</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#999"
            value={contact.username}
            onChangeText={(text) => {
              handleChange("username", text);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="phone" size={24} color="black" />
          <CountryPicker
            withFilter
            countryCode={countryCode}
            withFlag
            withAlphaFilter={false}
            withCurrencyButton={false}
            withCallingCode
            onSelect={(country) => {
              console.log("country", country);
              const { cca2, callingCode } = country;
              setCountryCode(cca2);
              setcallingCode(callingCode[0]);
            }}
          />
          <TextInput
            style={styles.input}
            keyboardType="name-phone-pad"
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
