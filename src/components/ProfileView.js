import React from "react";
import { View, Text, StyleSheet } from "react-native";

const getInitials = (name) => {
  const nameArray = name.split(" ");
  const initials =
    nameArray.length > 1
      ? nameArray[0].charAt(0) + nameArray[1].charAt(0)
      : nameArray[0].charAt(0);
  return initials.toUpperCase();
};

const getRandomColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 60%, 70%)`;
  return color;
};

const ProfileView = ({ name }) => {
  const initials = getInitials(name);
  const bgColor = getRandomColor(name);

  return (
    <View style={[styles.profileContainer, { backgroundColor: bgColor }]}>
      <Text style={styles.initials}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  initials: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileView;
