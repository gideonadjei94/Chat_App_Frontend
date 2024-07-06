import { View, Text, ImageBackground, StyleSheet,ScrollView } from 'react-native'
import React from 'react'
import { images } from '../../constants';

const Message = () => {
  return (
    <ImageBackground 
        source={{ uri: images.tower }} 
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View className="w-full justify-center items-center min-h-[85vh]">
            <Text className="text-gray-500 font-pregular text-center">
              Messages..!!!
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
  )
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default Message;
