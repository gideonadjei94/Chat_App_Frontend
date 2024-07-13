import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import storiesData from "../../assets/data/stories.json";
import StoryItem from "../components/StoryItem";
import { useNavigation } from "@react-navigation/native";

const StoriesScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Stories</Text>
      </View>
      <FlatList
        data={storiesData}
        renderItem={({ item }) => <StoryItem story={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.noUpdatesText}>No Updates</Text>
        }
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Icon
            name="comments"
            size={24}
            color="#000"
            onPress={() => navigation.navigate("Chats")}
          />
          <Text style={styles.footerButtonText}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon
            name="phone"
            size={24}
            color="#000"
            onPress={() => navigation.navigate("Call")}
          />
          <Text style={styles.footerButtonText}>Calls</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon
            name="circle"
            size={24}
            color="#000"
            onPress={() => navigation.navigate("Status")}
          />
          <Text style={styles.footerButtonText}>Status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon
            name="ellipsis-h"
            size={24}
            color="#000"
            onPress={() => navigation.navigate("Settings")}
          />
          <Text style={styles.footerButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  list: {
    padding: 10,
  },

  noUpdatesText: {
    textAlign: "center",
    color: "gray",
    marginTop: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#e0f7fa",
  },
  footerButton: {
    alignItems: "center",
  },
  footerButtonText: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default StoriesScreen;
