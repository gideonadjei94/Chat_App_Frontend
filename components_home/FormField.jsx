import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { icons } from '../src/constants';

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
 const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black font-pmedium">
        {title}
      </Text>
      <View className="w-10/12 h-12 px-4 bg-gray-300 focus: border-white items-center flex-row" >
<TextInput 
        className="flex-1 text-black font-psemibold text-base"
        value ={value}
        placeholder={placeholder}
        placeholderTextColor={"#232323"}
        onChangeText={handleChangeText}
        secureTextEntry={ title === 'Password' && !showPassword}
/>
    {(title === "Password" || title === "Confirm Password"  )&& (
        <TouchableOpacity onPress={()=>
            setShowPassword(!showPassword)
        }>
            <Image source={!showPassword? icons.eye: icons.eyeHide} className="w-6 h-6" resizeMode='contain'/>
        </TouchableOpacity>
    )}
      </View>
    </View>
  )
}

export default FormField