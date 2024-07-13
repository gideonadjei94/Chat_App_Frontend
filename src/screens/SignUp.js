import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import BlackButton from "../../components_home/BlackButton";
import ImageButton from "../../components_home/ImageButton";
import FormField from "../../components_home/FormField";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SignUp = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    contact: "",
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };
  // const sendDefaulChat = async () => {
  //   fetch(
  //     `http://10.132.62.10:8800/api/messages/create/6686dc65aaab99b567d20e44/${userId}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ message: "Hey There! Welcome to Wexy" }),
  //     }
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Could not send default message");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       Alert.alert(err.message);
  //     });
  // };

  const registerUser = async () => {
    fetch("http://10.132.62.10:8800/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid email or password");
        }
        return response.json();
      })
      .then((data) => {
        Alert.alert("Success", "User Registered successfully");
        setUserId(data._id);
        navigation.navigate("Chats", { userId: userId, user: data });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={images.wexy} resizeMode="contain" style={styles.logo} />

        <Text style={styles.title}>Create an account</Text>
      </View>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={form.username}
        onChangeText={(text) => handleChange("username", text)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        secureTextEntry
        value={form.confirmpassword}
        onChangeText={(text) => handleChange("confirmpassword", text)}
      />
      <TextInput
        placeholder="Phone Number"
        style={styles.input}
        keyboardType="phone-pad"
        value={form.contact}
        onChangeText={(text) => handleChange("contact", text)}
      />
      <TouchableOpacity style={styles.button} onPress={registerUser}>
        <Text style={styles.buttonText}>DONE</Text>
      </TouchableOpacity>
      <Text style={styles.linkText}>
        Already have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => {
            navigation.navigate("SignIn");
            setForm({
              username: "",
              email: "",
              password: "",
              confirmpassword: "",
              contact: "",
            });
          }}
        >
          Click here
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#00bfff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  logo: {
    width: 115,
    height: 115,
    resizeMode: "contain",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  linkText: {
    marginTop: 20,
    color: "#888",
  },
  link: {
    color: "#00bfff",
  },
});

export default SignUp;
