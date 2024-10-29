import { View, Text,SafeAreaView,Image, TextInput } from 'react-native'
import React, { useContext } from 'react'
import CustomButton from '../../../components/CustomButton'
import { TouchableOpacity } from 'react-native'
import { icons, images } from '../../../constants'
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router'
import { UserWorkout, WorkoutProvider } from "../../../context/currentWorkout"
import { useEffect } from 'react'
import uuid from "react-native-uuid"
import { useState } from 'react'
import { router } from 'expo-router'


const ActiveHome = () => {
  const { currentWorkout, setCurrentWorkout } = useContext(UserWorkout);
  const [ selectedExercise, setSelectedExercise] =  useState(1);
  const { data } = useLocalSearchParams();
  const planObject = data? JSON.parse(data) : null;


  const handleWeightChange = (text) =>  {
    setCurrentWeight(text)
  }
  const handleRepChange = (text) =>  {
    setCurrentReps(text)
  }


  const [ currentWeight, setCurrentWeight ] = useState(0);
  const [ currentReps, setCurrentReps ] = useState(0);


  useEffect(() => {
    if (planObject) {
      setCurrentWorkout((prevPlan) => ({
        ...prevPlan,
        WID: `Workout-${uuid.v4()}`,
        TPID: planObject.PID,
        Name: planObject.Name,
        EIDs: planObject.EIDs,
        CDate: new Date(),
        Active: true,
      }));
      console.log("Basic setup was successful");
    }
  }, [data]);


  const safeSet = ()=> {

  }


  return (
    <SafeAreaView className ="bg-primary h-full">
      <View className="border border-red-900 border-2 flex-1 m-5 justify-between items-center">
        <View className="h-[100px] border border-red-900 border-2 m-2">
          <Text className="text-white text-3xl font-bold text-center mt-2">{currentWorkout.Name}</Text>
          <Text className="text-white text-xl font-bold text-center mt-2"> 02:32 Hours </Text>
        </View>

        <View className="border border-red-900 border-2 p-3">
          <CustomButton
          containerStyles="bg-blue2 px-5 my-2"
          title="View Progress"
          handlePress={()=> {
            router.push("/progress-workout")
          }}
          />


          <TouchableOpacity onPress={()=> {
            router.push("/active-exercise-picker")
          }}>
            <View className="bg-blue2 justify-between items-center flex-row my-2 rounded-[5px] w-full">
            <View className="flex-row justify-center items-center">
            <Image source={images.thumbnail} className="h-[70px] w-[70px] m-2"/>
            <Text className="text-xl text-white text-start"> {currentWorkout.Selected.Name} </Text>
            </View>
            <Image source={icons.leftArrow} className="h-[20px] w-[25px] m-5"/>
          </View>
          </TouchableOpacity>
          <View className="flex-row justify-between m-2">
            <TextInput
              className="bg-white w-[45%] h-[40px] text-xl "
              placeholder='Weight'
              keyboardType='numeric'
              onChangeText={handleWeightChange}
            />
            <TextInput
              className="bg-white w-[45%] h-[40px] text-xl"
              placeholder='Reps'
              keyboardType='numeric'
              onChangeText={handleRepChange}

            />

          </View>
          <CustomButton
          title="Safe set"
          containerStyles="bg-green-500 my-2"
          handlePress={()=> {
            const set = {EID:currentWorkout.Selected.EID,Reps:currentReps,Weight:currentWeight}
            setCurrentWorkout((prevWorkout) => ({
              ...prevWorkout,
              SID:[...prevWorkout.SID,set]
            }))
            console.log(currentWorkout.SID)
          }}
          />

        </View>

        <View className="border border-red-900 border-2 m-2 p-2 h-[100px] justify-center">
          <CustomButton
          handlePress={()=> {console.log(currentWorkout)}}
          containerStyles="bg-red-900"
          title="Workout Beenden"
          />
        </View> 
        
        

      </View>
    </SafeAreaView>
  )
}

export default ActiveHome