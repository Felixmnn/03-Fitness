import { View, Text ,TextInput} from 'react-native'
import React from 'react'

const CustomTextInput = ({title,placeholder,handlingChange,keyType,width}) => {
  return (
    <TextInput
    className={`bg-textInputColor text-white border border-[2px] border-blue2 my-1 rounded-[10px] p-2 font-bold text-xl text-gray-500 w-[${width}] `}
    onChangeText={handlingChange}
    placeholder={placeholder}
    value={title}
    placeholderTextColor="#747070"
    keyboardType={keyType}
    
    />
  )
}

export default CustomTextInput