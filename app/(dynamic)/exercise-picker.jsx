import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import exercises from '../../constants/exercises';

import { router, useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { images } from '../../constants';

import { UserPlan } from "../../context/currentPlan";
import { useContext } from 'react';



const ExercisePicker = () => {


    const { currentPlan, setCurrentPlan } = useContext(UserPlan);
  


    const addEID = (newEID) => {
      setCurrentPlan((prevPlan) => {
        const updatedEIDs = prevPlan?.EIDs ? [...prevPlan.EIDs, newEID] : [newEID];
    
        return {
          ...prevPlan,
          EIDs: updatedEIDs, 
        };});};

  
  return (
    <SafeAreaView className="bg-primary h-full">
      <Text className="text-white text-3xl font-bold m-5">
        Choose a Exercise
      </Text>
      <View className="items-center justify-center">
      <FlatList
        data = {exercises}
        keyExtractor={(item) => item.EID}
        numColumns={2}

        renderItem={({item}) => (
          <TouchableOpacity onPress={()=> {
            addEID(item.EID)
            console.log(currentPlan.EIDs) 
            router.push("/create-plans")
            
            } }>
            <Image source={item.Image} className="h-[150px] w-[150px] mx-2 my-2"/>
            <Text className="text-white w-[150px] mx-2">{item.Name}</Text>
          </TouchableOpacity>
        )}
        
        />       
      </View>
        
    </SafeAreaView>
  );
};

export default ExercisePicker;
