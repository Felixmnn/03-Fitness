import { View, Text, Image,FlatList } from 'react-native'
import React from 'react'
import {images} from "../constants"
import {icons} from "../constants"
import { TouchableOpacity } from 'react-native'
import CustomButton from './CustomButton'
import { router } from 'expo-router'
import exercises from '../constants/exercises';
import { useRouter } from 'expo-router'



const WorkoutBox = ({planObject}) => {
  const {username} = "JEff"
  const router = useRouter()

  const exercisesToRender = exercises.filter(exercise => planObject.EIDs.includes(exercise.EID));
  

  return (
    <View className="bg-blue2  p-2 w-[100%] h-[200px]  rounded-[20px]">
      
      <View className="flex-row h-[70%] border border-red-900 border-2 p-1 mb-1">
        <View>
          <View className="w-[97%]  flex-row justify-between border border-red-900 border-2 mx-1">
            <Text className="text-xl font-bold text-white ml-2">{planObject.Name}</Text>
            <TouchableOpacity onPress={()=> {

              router.push({pathname:"/edit-workout", params: { data: JSON.stringify(planObject)}  })
              console.log(JSON.stringify(planObject))
            }}>
              <Image source={icons.rightArrow}/>
            </TouchableOpacity>
          </View>
          <View className="border border-red-900 m-1 w-[97%]">
            <Text className="text-white text-xxl font-bol">
              Exercises:
            </Text>
            <FlatList
              nestedScrollEnabled = {true}
              horizontal={true}
              data = {exercisesToRender}
              keyExtractor={(item) => item.EID.toString()}
              renderItem={({item}) => (
                <View className="flex-row">

                <Image className="w-[50px] h-[50px] m-1" source={item.Image}/>

                </View>
              )}

              
            />


            
          </View>
        </View>
      </View>
      <CustomButton
      title="Start Workout"
      handlePress={()=> {
        console.log(planObject)
        router.push({pathname:"/active-home", params: { data: JSON.stringify(planObject)}})}}
      /> 
    </View>
  )
}

export default WorkoutBox