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
import Main from '../../components/Main'
import Footer from '../../components/Footer'


const results = () => {


  const [pastWorkouts, setPastWorkouts] = useState([])
  const [amount , setAmount ] = useState(3)
  


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


    const fContent = ()=> {
      return (
      <NavBox
        title= "Upcoming"
        icon = {icons.plus}
        handlePress={()=> {router.push("/create-plans")}}
      />)
    }

    const yourLastWorkouts = ()=> {
      return(
        

              
              <FlatList
                  data={pastWorkouts}
                  numColumns={3}
                  keyExtractor={(item,index) => index.toString()}
                  renderItem={({item})=>{
                    return(
                      <TouchableOpacity className="bg-blue2 p-2 rounded-[5px] m-1 w-[30%]" onPress={()=> router.push({pathname:"/past-workout",params:{data:JSON.stringify(item)}})}>
                      
                        <Text className="text-white">{item.Name}</Text>
                        <Text className="text-white">{formattedDate(item.CDate)}</Text>
                    
                      </TouchableOpacity>
                  )}}/>
              
            



                 )
    }

 


  return (
    <SafeAreaView className="bg-black h-full">
    <View className="flex-1 m-2 justify-between">  
      <ProfilePicture message="Results"/>
      <Main content={yourLastWorkouts()}/>
      <Footer footerTitle="Discover" content={fContent()}/>
    </View>
  </SafeAreaView>
  )
}

export default results