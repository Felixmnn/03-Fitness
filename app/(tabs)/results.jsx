import { View, Text, FlatList, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBox from '../../components/NavBox'
import { icons } from '../../constants'
import { router } from 'expo-router'
import ProfilePicture from 'components/ProfilePicture';
import { TouchableOpacity } from 'react-native'
import WorkoutBox from '../../components/WorkoutBox'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { format } from 'date-fns';


const results = () => {


  const [pastWorkouts, setPastWorkouts] = useState([])

  useEffect( () => {
    getPastWorkouts()
  },[])
  
  const getPastWorkouts = async ()=> {
    const allKEys = await AsyncStorage.getAllKeys();
    const filteredKEys = allKEys.filter(key => key.includes("Workout"))
    const workoutEntries = await AsyncStorage.multiGet(filteredKEys)

    const parsedWorkouts = workoutEntries.map(([key,value])=> JSON.parse(value))
    const sortWorkouts = parsedWorkouts.sort((a,b)=> new Date(b.CDate) - new Date(a.CDate))
    setPastWorkouts(sortWorkouts)
      console.log(sortWorkouts)
    
  }

    const formattedDate = (date)=>{
      return format(date, 'dd.MM.yyyy');
    }

 


  return (
    <SafeAreaView className="bg-black h-full">
        <View className=" flex-1">
          <View className=" flex-row justify-between m-2 items-center">
            <Text className="text-white text-3xl font-bold">Resultate</Text>
            <ProfilePicture/>
          </View>
          <View className="justify-between  flex-1 m-2">
            <View>
              <Text className="text-2xl text-white font-bold mb-2">Letzte Workouts:</Text>
              <View >
              

              <FlatList
                data={pastWorkouts}
                numColumns={3}
                keyExtractor={(item,index) => index.toString()}
                renderItem={({item})=>{
                  return(
                    <TouchableOpacity onPress={()=> router.push({pathname:"/past-workout",params:{data:JSON.stringify(item)}})}>
                    <View className="bg-blue2 p-2 rounded-[5px] m-1">
                      <Text className="text-white">{item.Name}</Text>
                      <Text className="text-white">{formattedDate(item.CDate)}</Text>
                    </View>
                    </TouchableOpacity>

                  )
                }}
                />
              </View>

              
              
              
            </View>
            
            <View>
                <Text className="text-2xl text-white font-bold">Neue Features:</Text>
                <View className="flex-row">
                  
                    <View className="w-[45%] h-[120px] bg-blue2 justify-center rounded-[10px] items-center m-2 p-2">
                      <TouchableOpacity onPress={()=> {router.push("/analyse-training")}}>
                        <View className="items-center justify-center">
                          <Image source={icons.data} className="h-[50px] w-[50px]"/>
                          <Text className="text-xl text-white font-bold text-center mb-1">Charts</Text>
                        </View>
                      </TouchableOpacity>
                    </View> 
                  
                  
                    <View className="w-[45%] h-[120px] bg-blue2 justify-center rounded-[10px] items-center m-2 p-2">
                      <TouchableOpacity onPress={()=> {router.push("/experimental")}}>
                        <View className="items-center justify-center">
                          <Image source={icons.search} className="h-[40px] w-[40px]"/>
                          <Text className="text-xl text-white font-bold text-center mb-1">Lab</Text>
                        </View>
                      </TouchableOpacity>
                    </View> 
                  
              </View>
              
              
            </View>
          </View>
        </View>
      </SafeAreaView>
  )
}

export default results