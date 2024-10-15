import { View, Text, Image } from 'react-native'
import React from 'react'
import {images} from "../constants"
import {icons} from "../constants"
import { TouchableOpacity } from 'react-native'
import CustomButton from './CustomButton'


const WorkoutBox = ({title,musclegroups,imageurl,duration,added}) => {
  return (
      <View className="justify-start items-center bg-blue2 h-[120px] m-2 rounded-[10px] flex-row">
      <Image source={images.thumbnail} className="h-[110px] w-[110px] ml-1 rounded-[5px]" />
      
      
      <View className="flex-1 flex-col justify-between h-full ml-1 py-2">
        <View className =" flex-col flex justify-start">
          <View className="flex istems-center ">
            <View className="flex flex-row justify-between items-center">
             
              <Text className="text-2xl font-bold text-white">{title ? <Text>{title}</Text> : <Text>Name</Text>}</Text>
              <View className="mr-[2px]">
                {added ? (<Image source={icons.plus} className="h-[30px] w-[30px]"/>)
                :
                (<Image source={icons.plus} className="h-[30px] w-[30px]"/>)} 
              </View>
            </View>
            
          </View>

          <View className=" ">
            <Text className="text-white">{musclegroups ? <Text>{musclegroups}</Text> : <Text>Muscle A, Muscle B</Text>}</Text>
          </View>
        </View>
        
        <View className="flex flex-row justify-between items-end">
          <View className="flex flex-row  items-center  pr-2 pl-[2px] ">
            <Image source={icons.plus} className=" mr-1 h-[25px] w-[25px]"/>
            <Text className=" text-white ">{duration ?  <Text>{duration}</Text> : <Text>02:20 h </Text>}</Text>
          </View>
          

          <CustomButton title="Details" containerStyles= "py-[5px] mx-[5px]"/>
        </View>

      </View> 
      


    
    </View>
    
    
  )
}

export default WorkoutBox