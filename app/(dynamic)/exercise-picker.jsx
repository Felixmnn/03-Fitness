import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import exercises from '../../constants/exercises';

import { router, useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { images } from '../../constants';

import { UserPlan } from "../../context/currentPlan";
import { useContext } from 'react';
import { UserWorkout } from '../../context/currentWorkout';



const ExercisePicker = () => {


    //Function that ensures the Params are added in the right context
    const source = useLocalSearchParams()
    const {name} = source

    const {currentWorkout, setCurrentWorkout} = useContext(UserWorkout)


    //Adds the selected exercises to the previous Exercises

    const addExercisesWorkout = (newExercises) => {
      setCurrentWorkout((prevWorkout) => {
        const newWorkout = [...prevWorkout.EIDs,...newExercises]
        return {
          ...prevWorkout,
          EIDs:newWorkout,
        }
      })
    }


    const addExercises = (newExercises)=> {
      setCurrentPlan((prevPlan) => {
        const newArray = [...prevPlan.EIDs,...newExercises]
        return {
          ...prevPlan,
          EIDs:newArray,
        }
      })
    }

    const { currentPlan, setCurrentPlan } = useContext(UserPlan);
    const [selectedExercises, setSelectedExercises]  = useState([])
    


    const addEID = (newEID) => {
      setCurrentPlan((prevPlan) => {
        const updatedEIDs = prevPlan?.EIDs ? [...prevPlan.EIDs, newEID] : [newEID];
    
        return {
          ...prevPlan,
          EIDs: updatedEIDs, 
        };});};

  
  return (
    <SafeAreaView className="bg-primary h-full">
      <Text className="text-white text-3xl font-bold text-center my-5">
        Choose a Exercise
      </Text>
      <View className="h-[78%]">
      <FlatList
        
        data = {exercises}
        keyExtractor={(item) => item.EID}
        

        renderItem={({item}) => (

          <View>
            {selectedExercises.includes(item.EID)?(
              <View>
                <TouchableOpacity 
                    onPress={()=> {
                  setSelectedExercises(selectedExercises.filter(num => num !== item.EID))
                  console.log(selectedExercises)
                }}
                className={`flex-row border-2 border border-blue2 w-full justify-between items-center bg-blue2 }`}
                >

                        <Image source={item.Image} className="h-[80px] w-[80px] m-2"/>
                        <Text className="text-white w-[70%] font-bold text-xl ">{item.Name}</Text>
                </TouchableOpacity>
              </View>
            ):(
              <View>
                <TouchableOpacity 
                      onPress={()=> {
                    setSelectedExercises([...selectedExercises,item.EID])
                    console.log(selectedExercises)
                  }}
                  className={`flex-row border-2 border border-blue2 w-full justify-between items-center  }`}
                  >

                          <Image source={item.Image} className="h-[80px] w-[80px] m-2"/>
                          <Text className="text-white w-[70%] font-bold text-xl ">{item.Name}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          
        )}
        
        />     
        
      </View>
      <TouchableOpacity className="bg-blue2 rounded-[10px] mx-5 my-5 p-2 "
      onPress={  
        
        (name === "workout") ? (()=>{
          console.log(selectedExercises)
          console.log(currentWorkout.EIDs)
          addExercisesWorkout(selectedExercises)
          console.log(currentWorkout.EIDs)
          router.back()
        }): 
        (()=>{
          console.log(name)
          addExercises(selectedExercises)
          router.back()}
        )}>
        <Text className="text-xl text-white font-bold text-center text-center">
          Add to Plan
        </Text>
      </TouchableOpacity>  
      
      
        
    </SafeAreaView>
  );
};

export default ExercisePicker;
