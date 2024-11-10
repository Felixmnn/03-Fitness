import { View, Text, FlatList,ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import  WorkoutBox from "components/WorkoutBox"
import  CustomButton  from "components/CustomButton";
import ProfilePicture from 'components/ProfilePicture';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import uuid from "react-native-uuid";
import WorkoutBoxV2 from '../../components/WorkoutBoxV2';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useContext } from 'react';
import { UserWorkout, WorkoutProvider } from "../../context/currentWorkout"

const Home = () => {

  const initialWorkout = {
    WID:"",
    TPID:"",
    Type:"Workout",
    Name:"",
    Selected:-1,
    EIDs:[],     
    SID:[],     
    CDate:"",     
    STime:"",    
    Duration:"",
    Public:false,
    Saved:false,
    Active:false,
    };


  const { currentWorkout, setCurrentWorkout } = useContext(UserWorkout);


  const [activeWorkouts , setActiveWorkouts] = useState(false)

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

  useEffect(() => {
    // Prüft jede Sekunde, ob ein aktives Workout existiert
    const interval = setInterval(() => {
      checkIfEntryExists("ActiveWorkout");
    }, 1000); // Zeit in Millisekunden, hier 1000 ms = 1 Sekunde

    // Bereinigt das Intervall, wenn die Komponente unmontiert wird
    return () => clearInterval(interval);
  }, []);

  const checkIfEntryExists = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setActiveWorkouts(true)
        return true;
      } else {
        setActiveWorkouts(false)
        return false;
      }
    } catch (error) {
      console.error("Fehler beim Lesen des AsyncStorage:", error);
      return false;
    }
  };
  
  const setWorkoutInactive = async ()=>{
    await AsyncStorage.removeItem("ActiveWorkout")
  }

  const getActiveWorkout = async ()=> {
     const data = await AsyncStorage.getItem("ActiveWorkout")
      const unfinishedWorkout = JSON.parse(data)
      console.log(unfinishedWorkout)
      return (unfinishedWorkout)
  }

  

 

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="flex-1 mx-2">
        <View className="flex-row justify-between m-2 items-center">
          <Text className="text-white text-3xl font-bold">Guten Tag </Text>
          <ProfilePicture />
        </View>
        <View className="flex-1 items-center justify-end">
          {
            (activeWorkouts)?(
              
            <View className="p-2 border border-blue2 border-[3px] items-center rounded-[5px] w-full m-5">
              <Text className="text-white text-2xl font-bold">Active Workout</Text>
                <View className="flex-row items-center">
              <TouchableOpacity className="mx-5 my-2" onPress={async()=> {
                if (currentWorkout.Active){
                  router.push("/active-home")
                } else {
                  const getData = await getActiveWorkout();
                  setCurrentWorkout(getData);
                  router.push("/active-home")
                }
              }}>
                <View className="flex-row items-center">
                <Icon name="play" size={15} color={"green"} />
                  <Text className="text-green-700 font-bold m-1 text-xl mt-[1px]">Continue</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="mx-5 my-2" onPress={async()=> { setCurrentWorkout(initialWorkout); await setWorkoutInactive()}}>
                <View className="flex-row items-center">
                <Icon name="close" size={15} color={"red"} />
                  <Text className="text-red-500 font-bold m-1 text-xl ">Delete</Text>
                </View>
              </TouchableOpacity>
              
            </View>
            </View>):

            ( <View>
                {items.map(item => (
                  <View key={item.PID} style={{ marginBottom: 16 }}>
                    <WorkoutBox planObject={item} />
                  </View>
                ))}
              </View>
            )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home