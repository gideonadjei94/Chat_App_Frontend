import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ProfileView from "../ProfileView";
dayjs.extend(relativeTime);

const ChatListItem = ({ chat, userId }) => {
  const navigation = useNavigation();
  const lastMessage =
    chat.messages !== null
      ? chat.messages.length > 0
        ? chat.messages[chat.messages.length - 1].isAudio
          ? "Audio"
          : chat.messages[chat.messages.length - 1].message
        : "Hey there! I'm using Wexy"
      : null;

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Chat", {
          chatId: chat.Id,
          name: chat.username,
          Id: userId,
          member: chat.member,
        })
      }
      style={styles.container}
    >
      <ProfileView name={chat.username} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {chat.username}
          </Text>
          {/* <Text style={styles.subTitle}>
            {dayjs(chat.messages[chat.messages.length - 1].timestamp).fromNow(
              true
            )}
          </Text> */}
        </View>
        <Text numberOfLines={2} style={styles.subTitle}>
          {!chat.isAudio ? lastMessage : "Audio"}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,

    height: 70,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,
    borderBottomColor: "lightgray",
    borderBottom: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  name: {
    flex: 1,
    fontWeight: "bold",
  },
  subTitle: {
    color: "grey",
  },
});

export default ChatListItem;
