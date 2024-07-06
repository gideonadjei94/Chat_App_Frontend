import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import BlackButton from "../../components_home/BlackButton";
import FormField from "../../components_home/FormField";
import { useNavigation } from "@react-navigation/native";
import { io } from "socket.io-client";
//import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const loginUser = async () => {
    await fetch("http://10.132.62.10:8800/api/user/login", {
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
        Alert.alert("Success", "User Logged in Successfully");
        navigation.navigate("Chats", { userId: data._id, user: data });
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  useEffect(() => {
    const socket = io("http://10.132.62.10:3000");
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={images.wexy} resizeMode="contain" style={styles.logo} />
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
      <TouchableOpacity style={styles.button} onPress={loginUser}>
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
      <Text style={styles.linkText}>
        Don't have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => {
            navigation.navigate("SignUp");
            setForm({
              email: "",
              password: "",
            });
          }}
        >
          Click here
        </Text>
      </Text>
    </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // background: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    justifyContent: "center",
  },
  linkText: {
    marginTop: 20,
    color: "#888",
  },
  link: {
    color: "#00bfff",
  },
  logo: {
    width: 115,
    height: 115,
    resizeMode: "contain",
  },
});

export default SignIn;
