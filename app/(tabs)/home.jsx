import { View, Text, FlatList,ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import  WorkoutBox from "components/WorkoutBox"
import  CustomButton  from "components/CustomButton";
import ProfilePicture from 'components/ProfilePicture';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, Component } from 'react';
import uuid from "react-native-uuid";
import WorkoutBoxV2 from '../../components/WorkoutBoxV2';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useContext } from 'react';
import { UserWorkout, WorkoutProvider } from "../../context/currentWorkout"
import Footer from '../../components/Footer';
import Main from '../../components/Main';
import CustomScrollView from '../../components/CustomScrollView';
import { PieChart } from 'react-native-chart-kit';
import exercises from '../../constants/exercises';
import { genSync } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const Home = () => {
  const { user, isLoggedIn, setUser } = useGlobalContext();
  const { currentWorkout, setCurrentWorkout } = useContext(UserWorkout);
  const [activeWorkouts , setActiveWorkouts] = useState(false)
  const [compontes,setComonents] = useState([]);
  const [filteredKeys, setFilteredKeys] = useState([]);
  const [items,setItems] = useState([]);
  const [workoutsThisMonth, setWorkoutThisMonth] = useState([]);

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
   
  
  const getKeyObject = async(key)=>{
    const rawData = await AsyncStorage.getItem(key)
    const parsedtData = JSON.parse(rawData) 
    return parsedtData
  }

  


  

  


  useEffect(() => {
    if (workoutsThisMonth && workoutsThisMonth.length > 0) {
      console.log("Component were set sucessfully")
      setComonents([component1(),componet2()]);
    } else {
      setComonents([]);
    }
}, [workoutsThisMonth]);

    useEffect(() => {
      const fetchWorkouts = async () => {
          await setWorkoutsOfThisMonth();
          const userID = user.$id;
          genSync();
      };
      fetchWorkouts();
    }, []);

  const setWorkoutsOfThisMonth = async() => {
    const allKeys = await AsyncStorage.getAllKeys();
    const workoutKeys = allKeys.filter((key) => key.includes("Workout-"))
    console.log("Hier sind die Keys",workoutKeys);

    const getWorkouts = await AsyncStorage.multiGet(workoutKeys)

    const parsedWorkouts = getWorkouts.map(([key,value]) => JSON.parse(value))
    console.log("Hier sollte alle Workouts sein",parsedWorkouts);

    const today = new Date();
    const thisMonthEntrys = parsedWorkouts.filter((item) => {
      const workoutDate = new Date(item.CDate)
      return !isNaN(workoutDate) && workoutDate.getMonth() === today.getMonth();
    })

    console.log("Hier sollten alle Einträge dieses Monats sein",thisMonthEntrys);

    setWorkoutThisMonth(thisMonthEntrys)
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

    const component1 = () => {
      const setGrouped = () => {
        const blueShades = ['#1E90FF', '#00BFFF', '#5F9EA0', '#4682B4', '#6495ED', '#4169E1', '#87CEEB', '#4682B4']; // Liste von Blautönen
      console.log(workoutsThisMonth,"Workouts this Month")
        const groupedObj = workoutsThisMonth.reduce((acc, item) => {
          if (!acc[item.Name]) {
            acc[item.Name] = {
              name: item.Name,
              number: 0,
              color: blueShades[Object.keys(acc).length % blueShades.length], // Zuweisen eines Blautons
              legendFontColor: '#FFF',
              legendFontSize: 15
            };
          }
          acc[item.Name].number += 1;


          return acc;
        }, {});
      console.log(groupedObj,"GroupObject")
        return Object.values(groupedObj);
      };
      

      const data = setGrouped();

      const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

      return (
        <View className="bg-blue2 rounded-[10px] h-[180px] w-[300px] items-center justiy-center pb-2 my-2">
          <Text className="text-white font-bold text-xl">Workouts this Month</Text>
        <PieChart
          data={data}
          height={150}
          width={300}
          chartConfig={chartConfig}
          backgroundColor='transparent'
          accessor='number'
        
        
        />
        </View>
      )
    }

    const componet2 = () => {
      
      function createExerciseSummary(data) {
        // Gruppiere die Übungen nach EID
        const grouped = data.reduce((acc, item) => {
          if (!acc[item.EID]) {
            acc[item.EID] = { count: 0, totalSets: 0 };
          } 
          acc[item.EID].count += 1;
          acc[item.EID].totalSets += item.Sets;
          return acc;
        }, {});
      
        // Erstelle die gewünschte Struktur
        const summary = Object.entries(grouped).map(([EID, { count, totalSets }]) => ({
          Name: EID,
          Info: `${count} Sets`,
        }));
       
        return summary;
      }

      const workout = workoutsThisMonth[0];
      const date = new Date(workout.CDate);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDay();
      const formatedDate = `${(day > 9 )?day:`0${day}`}-${(month > 9)?month:`0${month}`}-${year}`
      const duration = (workout.Duration == "")?"00:00":workout.Duration;
      
      return (
        <View className="bg-blue2 rounded-[10px] h-[180px] w-[300px] justiy-center pb-2 m-2">
          <Text className="text-white font-bold text-xl text-center">Last Workout</Text>
          <View className="flex-row justify-between w-[90%] mt-2 ml-2">
            <Text className="text-white ">{formatedDate}</Text>
            <Text className="text-white ">{duration} Minutes</Text>
          </View>
          <Text className="text-white font-bold text-xl ml-2">Exercises:</Text>
          <View className="flex-row  m-2 flex-wrap ">
          {createExerciseSummary(workout.SID).map((item,index)=>(
                    <View key={`${item.EID}-${index}`}  className="bg-blue-500 m-1 p-1 rounded-[5px]">
                    <Text className="text-white">{exercises[item.Name-1].Name}  {item.Info}</Text>
                    </View>
                  ))
                  }
          </View>
          </View>
      );
    }

    const fContent = ()=> {
      return (
        <View>
          <FlatList
          data={compontes}
          horizontal={true}
          keyExtractor={(item, index) => `component-${index}`}
          renderItem={({item,index})=> {
        
            return (

                <View key={`component-${index}`}>{item}</View>
            )
            }}

          ListEmptyComponent={()=>{
            return (
              <View className="flex-row">
                <View className="bg-blue2 h-[150px] w-[200px] items-center justify-center rounded-[10px] m-1">
                  <Text className="text-white font-bold text-xl text-center">Quick Insights</Text>
                  <Icon name="pie-chart" color={"white"} size={30}/>
                </View>
                <View className="bg-blue2 h-[150px] w-[200px] items-center justify-center rounded-[10px] m-1">
                  <Text className="text-white font-bold text-xl text-center">Last Workout</Text>
                  <Icon name="filter" color={"white"} size={30}/>
                </View>
              </View>
            )
          }

          }
          
          />
        </View>
            )
      }
 
  return (
    <SafeAreaView className="bg-black h-full">
        <View className="h-full m-2 ">
         
          <ProfilePicture message="Home"/>
          <View className="flex-1 items-center justify-start">
          {
            (activeWorkouts)?(
              
            <View className="p-2 bg-blue2 items-center rounded-[5px] w-full m-5">
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
                <Icon name="play" size={15} color={"#3B82F6"} />
                  <Text className="text-blue-500 font-bold m-1 text-xl mt-[1px]">Continue</Text>
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

            ( <TouchableOpacity className="flex-row justify-between items-center bg-blue2 m-2 p-4 rounded-[10px] w-full h-[100px]" onPress={()=> router.push("/plans")}>
                <Text className="text-white font-bold text-xl mx-2">Start a Workout</Text>
                <Icon name="plus" size={30} color={"white"}/>
              </TouchableOpacity>
            )}
            
            


        </View>
        <View className="flex1 justify-end mb-3">
        <Footer footerTitle="Quick Insights:" content={fContent()}/>
        </View>
          
          
        </View>

      </SafeAreaView>
  )
}

export default Home