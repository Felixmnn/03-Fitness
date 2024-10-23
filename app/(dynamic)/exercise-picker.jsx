import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import exercises from '../../constants/exercises';

import { router, useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { images } from '../../constants';

const ExercisePicker = () => {
    const { data } = useLocalSearchParams();
    const parsedData = JSON.parse(data)
  
  return (
    <SafeAreaView className="bg-primary h-full">
        <FlatList
        data = {exercises}
        keyExtractor={(item) => item.EID}
        renderItem={({item}) => (
          <TouchableOpacity onPress={()=> {
            const updatedArray = [...parsedData,item.EID];
            console.log(updatedArray)
            router.push({
              pathname: "/create-plans",
              params: {updatedData: JSON.stringify(updatedArray)}
            })            
            }}>
            <Image source={item.Image}/>
          </TouchableOpacity>
        )}
        
        />       
    </SafeAreaView>
  );
};

export default ExercisePicker;
