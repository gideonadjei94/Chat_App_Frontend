import { View, TextInput, StyleSheet } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

const InputBox = ({ member, userId, chatId }) => {
  //state data is the data declared and managed inside
  const [newMessage, setNewMessage] = useState({
    message: "",
  });

  const handleChange = (name, value) => {
    setNewMessage({ ...newMessage, [name]: value });
  };
  const fetchMessages = async () => {
    fetch(
      `http://10.132.62.10:8800/api/messages/getmessages/${userId}/${chatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch messages");
        }
        return response.json();
      })
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  const sendMessage = async () => {
    fetch(`http://10.132.62.10:8800/api/messages/create/${userId}/${member}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not send default message");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };

  return (
    <View style={styles.container}>
      {/* Icon */}
      <AntDesign name="plus" size={24} color="royal blue" />
      {/* Text Input */}
      <TextInput
        value={newMessage}
        onChangeText={(text) => handleChange("message", text)}
        style={styles.input}
        placeholder=" type your message..."
      />
      {/* Icon */}
      <MaterialIcons
        onPress={() => {
          sendMessage();
          setNewMessage({ message: "" });
        }}
        name="send"
        size={24}
        color="blue"
        style={styles.send}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    padding: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },

  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    fontSize: 16,

    borderRadius: 50,
    borderColor: "lightgray",
    borderWidth: StyleSheet.hairlineWidth,
  },
  send: {
    backgroundColor: "royal blue",
    padding: 7,
    borderRadius: 15,
    overflow: "hidden",
    marginLeft: 30,
  },
});

export default InputBox;
