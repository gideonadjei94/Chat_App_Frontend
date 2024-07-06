import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native";
import { images } from '../src/constants';
const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  image
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-slate-200 rounded-xl min-h-[55px] mt-5 w-10/12 flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      
      <Image source={images.google} resizeMode="contain" className="w-[31px] h-[35px]"/>
      <Text className={`text-black font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;