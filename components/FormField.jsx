import { View, Text, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { icons } from '../constants'
 

const FormField = ({title,value,placeholder, handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setshowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
        <View className="border-2 border-black-200 w-full h-16 px-4 bg-white rounded-2xl focus:border-red-500 items-center flex-row my-2">
            <TextInput className="flex-1 text-black font-psemibold text-base"
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor="gray"
                        onChangeText={handleChangeText}
                        secureTextEntry = {title === 'Password' && !showPassword || title === 'Confirm Password'}
                        />
                        {title === "Password" && (<TouchableOpacity onPress={() => setshowPassword(!showPassword)}
                          >
                            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain"/>
                        </TouchableOpacity>)}
        </View>
    </View>
  )
}

export default FormField