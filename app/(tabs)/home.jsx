import { View, Text, FlatList,ScrollView, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfilePicture from 'components/ProfilePicture';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useContext } from 'react';
import { UserWorkout, WorkoutProvider } from "../../context/currentWorkout"
import Footer from '../../components/Footer';
import { PieChart } from 'react-native-chart-kit';
import exercises from '../../constants/exercises';
import { genSync } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import SummaryChart from '../../components/SummaryChart';
import { StatusBar } from 'expo-status-bar';

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

  


  

  const [barChartData, setBarChartData ] = useState([]);


  useEffect(() => {
    if (workoutsThisMonth && workoutsThisMonth.length > 0) {
      //console.log("Component were set sucessfully")
      setComonents([component1(),componet2()]);
    } else {
      setComonents([]);
    }
}, [workoutsThisMonth]);

  useEffect(() => {
    if (!user) return; // Warte, bis der user definiert ist

    const fetchWorkouts = async () => {
      try {
        await setWorkoutsOfThisMonth();
        const userID = user.$id;
        genSync();
      } catch (error) {
        console.error("Fehler beim Laden der Workouts:", error);
      }
    };

    fetchWorkouts();
  }, [user]);

  const last7Exercises = (workouts) =>{
    const days = ["Sun","Mon","Tue","Wen","Thu","Fri","Sat","Sun","Mon","Tue","Wen","Thu","Fri","Sat","Sun","Mon","Tue","Wen","Thu","Fri","Sat","Sun","Mon","Tue","Wen","Thu","Fri","Sat","Sun","Mon","Tue","Wen","Thu","Fri","Sat"];
    const t = new Date();
    const t2 = new Date();
    const last7e = [];
    const formatToday = (date) => date.toISOString().split('T')[0];
    const sumDuration = (date) => {
      let result = 1;

      workouts.map((workout)=> {
        const compareDate = new Date(workout.CDate).toISOString().split('T')[0];
        if ( compareDate == date  &&  workout.Duration !== "NaN"){
          result += Number(workout.Duration);
        }
        else if (compareDate == date){
          result += 1;
        }

      })
      return result;
    }
    t.setDate(t.getDate() + 1);
    for (let i = +1; i< 8; i++){
      t.setDate(t.getDate() - 1);
      //console.log(formatToday(t));
      if(t2.getDate() - i < 0){
        last7e.push({label:days[t2.getDate() - i +7],value:sumDuration(formatToday(t))});
      } else{
        last7e.push({label:days[t2.getDate() - i],value:sumDuration(formatToday(t))});
      }
    }
    return last7e
  }
  const setWorkoutsOfThisMonth = async() => {
    const allKeys = await AsyncStorage.getAllKeys();
    const workoutKeys = allKeys.filter((key) => key.includes("Workout-"))
    //console.log("Hier sind die Keys",workoutKeys);

    const getWorkouts = await AsyncStorage.multiGet(workoutKeys)

    const parsedWorkouts = getWorkouts.map(([key,value]) => JSON.parse(value));
    const last7 = last7Exercises(parsedWorkouts);

    setBarChartData(last7.reverse());
    const today = new Date();
    const thisMonthEntrys = parsedWorkouts.filter((item) => {

      const workoutDate = new Date(item.CDate)
      return !isNaN(workoutDate) && workoutDate.getMonth() === today.getMonth();
    })

    //console.log("Hier sollten alle Einträge dieses Monats sein",thisMonthEntrys);

    setWorkoutThisMonth(thisMonthEntrys)
  }

 

  useEffect(() => {
    // Prüft jede Sekunde, ob ein aktives Workout existiert
    const interval = setInterval(() => {
      //console.log(workoutsThisMonth)
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
      //console.log(unfinishedWorkout)
      return (unfinishedWorkout)
  }

    const component1 = () => {
      const setGrouped = () => {

        const blueShades = ['#1E90FF', '#00BFFF', '#5F9EA0', '#4682B4']; // Liste von Blautönen
        const entrys = [];
        
        const groupedWorkouts = workoutsThisMonth.map((workout)=> {
          let obj = (entrys.length > 0)?(entrys.find((entry)=> entry.name == workout.Name )):(false);
          if (obj){
            obj.count +=1;
          } else{
            entrys.push({name:workout.Name,count:1});
          }
        });
        entrys.sort((a,b)=>b.count - a.count);
        
        const grouped = () => {
          const object = [];
          let count = 0;
      
          // Falls die Länge von entrys größer als 3 ist, berechne die Summe der counts ab Index 3
          if (entrys.length > 3) {
            for (let i = 3; i < entrys.length; i++) {
              count += entrys[i].count;
            }
          }
      
          // Iteriere durch die Einträge und füge sie zum Objekt hinzu
          for (let i = 0; i < entrys.length; i++) {
            object[i] = {
              name: (entrys[i].name.length > 8)?`${entrys[i].name.substring(0,8)}...`:entrys[i].name,
              number: entrys[i].count,
              color: blueShades[i],
              legendFontColor: "#FFF",
              legendFontSize: 15,
            };
          }
      
          return object;
        };
      
        const groupedData = grouped();
        return groupedData;
      };
    
      const data = setGrouped();
      console.log("Fitting Format",data);
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
        <View className="bg-blue2 rounded-[5px] h-[180px] w-[300px] items-center justiy-center pb-2">
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
      const sortedWorkouts = workoutsThisMonth.sort((a,b)=> new Date (a.CDate) - new Date(b.CDate));

      const sortedWorkoutsReversed = sortedWorkouts.reverse();
      const workout = sortedWorkoutsReversed[0];

      //console.log("Workout this Month",workout.CDate)
      const date = new Date(workout.CDate);
      //console.log(date)
      const year = date.getFullYear();
      const month = date.getMonth()+1;
      const day = date.getDate();
      console.log("Workout",workout);
      console.log("Day",day,"month",month);
      const formatedDate = `${(day > 9 )?day:`0${day}`}-${(month > 9)?month:`0${month}`}-${year}`
      //console.log("Current Date", formatedDate);
      const duration = (workout.Duration == "")?"00:00":workout.Duration;

      const hours = Math.floor(duration/ 60);
      const minutes = duration%60;
      const formatDuration = `${(hours>0)?((hours>9)?(hours):(`0${hours}`)):("00")}:${(minutes>0)?((minutes>9)?(minutes):(`0${minutes}`)):("00")}`
      
      return (
        <View className="bg-blue2 rounded-[5px] h-[180px] w-[300px] justiy-center px-2">
          <Text className="text-white font-bold text-xl text-center">Last Workout: {workout.Name}</Text>
          <View className="flex-row justify-between w-[100%] items-center">
            <View className="flex-row items-center">
              <Text className="text-white font-bold mr-1 text-xl ">{formatedDate}</Text>
              <Icon name='calendar' size={15} color={"white"}/>
            </View>
            <View className="flex-row items-center">
            <Text className="text-white font-bold text-xl mr-2">{(duration !== NaN)?(formatDuration):null}</Text>
            <View className="relative justify-center items-center">
              <Icon name="clock-o" size={25} color="white" />
              {

              (!(duration !== NaN))?(
              <View className="absolute left-[10px] right-0 h-[2px] bg-white w-[30px]"
                style={{
                  height: 28, // Höhe der Linie
                  width: 2,  // Breite in Pixeln
                  backgroundColor: 'red', // Farbe der Linie
                  transform: [{ rotate: '45deg' }], // Die Linie um 45 Grad rotieren
                  }}
              />):null
                }
            </View>
            </View>
          </View>
          <View className="flex-row mt-2 flex-wrap justify-start items-start">
            {
              (workout.SID.length > 0) ? (
                createExerciseSummary(workout.SID).map((item,index)=>(
                  <View key={`${item.EID}-${index}`}  className="bg-blue-500 mr-1.5 p-1 rounded-[5px]">
                  <Text className="text-white">{exercises[item.Name-1].Name}  {item.Info}</Text>
                  </View>
                ))
              ):(
                <Text className="text-xl font-bold text-white text-center">No Entrys</Text>
              )
            }
         
          </View>
          </View>
      );
    }

    const fContent = ()=> {
      return (
        <View className="mb-2 pr-4">
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
                <View className="bg-blue2 h-[150px] w-[200px] items-center justify-center rounded-[5px] m-1">
                  <Text className="text-white font-bold text-xl text-center">Quick Insights</Text>
                  <Icon name="pie-chart" color={"white"} size={30}/>
                </View>
                <View className="bg-blue2 h-[150px] w-[200px] items-center justify-center rounded-[5px] m-1">
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
    <SafeAreaView className="bg-black h-full pt-1">
          <View className="w-full">
            <ProfilePicture message="Home"/>
          </View>
        <View className="flex-1 m-2 justify-between items-center w-full">
         <View className="justify-center w-full items-center ">
          <View className={`w-${(Dimensions.get('window').width > 350) ? 350 :Dimensions.get('window').width} items-center justify-center max-w-[600px]`}>
          {
            (activeWorkouts)?(
              
            <View className="p-2 bg-blue2 items-center rounded-[5px] w-full m-5">
              <Text className="text-white text-2xl font-bold">Active Workout: {currentWorkout.Name}</Text>
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
                <View className="flex-row items-center justify-center bg-blue-500 h-[40px] w-[120px] rounded-[5px]">
                  <Icon name="play" size={15} color={"white"} />
                  <Text className="text-white font-bold m-1 text-xl mt-[1px]">Continue</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="mx-5 my-2" onPress={async()=> { setCurrentWorkout(initialWorkout); await setWorkoutInactive()}}>
                <View className="flex-row items-center justify-center bg-red-900 h-[40px] w-[120px] rounded-[5px]">
                  <Icon name="close" size={18} color={"white"} />
                  <Text className="text-white font-bold m-1 text-xl ">Delete</Text>
                </View>
              </TouchableOpacity>
              
            </View>
            </View>):

            ( <View className="mt-3 mr-3 items-center w-full max-w-[600px]"> 
                <SummaryChart data={barChartData}/>
                <TouchableOpacity className={`flex-row items-center justify-center bg-blue2 p-4 my-2 rounded-[5px] h-[60px] `} onPress={()=> router.push("/plans")}>
                  <Text className="text-white font-bold text-xl">Start a Workout</Text>
                </TouchableOpacity>
              </View>
            )}
            
            


        </View>
        </View>
        <Footer footerTitle="Quick Insights:" content={fContent()}/>
        </View>

      </SafeAreaView>
  )
}

export default Home