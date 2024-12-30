import { View, Text, TextInput, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { icons } from '../constants'
 

const FormField = ({title,value,placeholder, handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setshowPassword] = useState(false)
      const iconSize = Platform.select({ web: 30, default: 24 }); // Different size for web
    
  return (
    <View className={`space-y-2 ${otherStyles}`}>
        <View className="border-2 bg-textInputColor border-black-200 w-full h-16 px-4 border-blue2 rounded-2xl focus:border-red-500 items-center flex-row my-2">
            <TextInput className="flex-1 text-white font-psemibold text-base"
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor="gray"
                        onChangeText={handleChangeText}
                        secureTextEntry = {title === 'Password' && !showPassword || title === 'Confirm Password'}
                        />
                        {title === "Password" && (<TouchableOpacity onPress={() => setshowPassword(!showPassword)}
                          >
                            <Image source={!showPassword ? icons.eye : icons.eyeHide} style={{ width: iconSize, height: iconSize }}  resizeMode="contain"/>
                        </TouchableOpacity>)}
        </View>
    </View>
  )
}

export default FormField