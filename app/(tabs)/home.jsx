import { View, Text, FlatList,ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import  WorkoutBox from "components/WorkoutBox"
import  CustomButton  from "components/CustomButton";
import ProfilePicture from 'components/ProfilePicture';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import uuid from "react-native-uuid";

const Home = () => {


  const getKeys = async ()=> {
    const k = await AsyncStorage.getAllKeys()
    return k
  }

  const [filteredKeys, setFilteredKeys] = useState([]);
  const [items,setItems] = useState([]);

  useEffect(() => {
    const fetchKeysAndData = async () => {
      try {
        const storedKeys = await AsyncStorage.getAllKeys();
        const planKeys = storedKeys.filter(key => key.startsWith("Plan-"));
        setFilteredKeys(planKeys);

        // Lade die Plandaten für jeden Schlüssel
        const plansData = await Promise.all(planKeys.map(async key => await getKeyObject(key)));
        setItems(plansData.filter(item => item !== null)); // Setze den Zustand mit validen Objekten
      } catch (error) {

        console.log(error);
      }
    };
    fetchKeysAndData();
  }, []);

  const getKeyObject = async(key)=>{
    const rawData = await AsyncStorage.getItem(key)
    const parsedtData = JSON.parse(rawData) 
    return parsedtData
  }
  

 

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
      <View className="flex-1 border border-red-900 border-2 m-5">
        <View className="flex-row justify-between m-2 items-center">
          <Text className="text-white text-3xl font-bold">Guten Tag </Text>
          <ProfilePicture />
        </View>
        <View className="border border-red-900 border-2 flex-1 justify-center items-center">
        <View>
        {items.map(item => (
          <View key={item.PID} style={{ marginBottom: 16 }}>
            <WorkoutBox planObject={item} />
          </View>
        ))}
        </View>
          
          
          
          
          <CustomButton
          title ="I do storage Stuff"
          handlePress = { async ()=>{
            console.log(planObject)
            }

          }
          />
          
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home