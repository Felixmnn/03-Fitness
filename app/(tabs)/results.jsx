import { View, Text, FlatList, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBox from '../../components/NavBox'
import { icons, images } from '../../constants'
import { router } from 'expo-router'
import ProfilePicture from 'components/ProfilePicture';
import { TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { format } from 'date-fns';
import Main from '../../components/Main'
import Footer from '../../components/Footer'
import Icon from 'react-native-vector-icons/FontAwesome';
import exercises from '../../constants/exercises'
import { Svg, Rect } from 'react-native-svg'; // Importiere das Svg-Tag, um den Gradient anzuwenden
import { LinearGradient, Stop } from 'react-native-svg'



const results = () => {


  const [pastWorkouts, setPastWorkouts] = useState([])
  const [amount , setAmount ] = useState(3)
  

  


  useEffect( () => {
    getPastWorkouts()
  },[])
  
  const getPastWorkouts = async ()=> {
    const allKEys = await AsyncStorage.getAllKeys();
    console.log(allKEys,"Hier sind alle  Keys")
    

    const filteredKEys = allKEys.filter(key => key.includes("Workout") && !key.includes("ActiveWorkout") )
    console.log("Hier sind die Keys",filteredKEys);

    const workoutEntries = await AsyncStorage.multiGet(filteredKEys)

    const parsedWorkouts = workoutEntries.map(([key,value])=> JSON.parse(value))
    const sortWorkouts = parsedWorkouts.sort((a,b)=> new Date(b.CDate) - new Date(a.CDate))
    
    
    const PIDs = [];
    const filteredWorkouts = sortWorkouts.filter((workout) => {
      if (PIDs.includes(workout.WID)) {
        return false; // Workout wird nicht in das Ergebnis aufgenommen
      } else {
        PIDs.push(workout.WID);
        return true; // Workout wird in das Ergebnis aufgenommen
      }
    });

    setPastWorkouts(filteredWorkouts);

  }

    const formattedDate = (date)=>{
      return format(date, 'dd.MM.yyyy');
    }


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
        Info: `${count} ${(count== 1)?"Set":"Sets"}`,
      }));
    
      return summary;
    }


    function formatMinutes(totalMinutes){
      const hours = Math.floor(totalMinutes/60);
      const minutes = totalMinutes %60

      const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}`;
        }
    



    const fContent = ()=> {

      return (
        <View className="flex-row">
          <TouchableOpacity className="justify-center items-center bg-blue2 rounded-[5px]  h-[150px] w-[150px] "  onPress={()=> router.push("/experimental")}>
            <Icon name="envelope" size={30} color="white" />
            <Text className="text-white font-bold m-2 text-xl text-center">{"Upcoming"}</Text>
          </TouchableOpacity>
    </View>
    )
    }

    const yourLastWorkouts = ()=> {
      return (
        <View className="justify-start flex-1">
    
         
    
          {pastWorkouts.length > 0 ? (
            <View className="justify-start flex-1">
              <TouchableOpacity
                className="items-center justify-center my-2 z-15"
                onPress={() => {
                  amount === 3 ? setAmount(2) : amount === 2 ? setAmount(1) : setAmount(3);
                }}
              >
                
                {amount === 1 ? (
                  <Icon name="th-list" size={30} color="white" />
                ) : amount === 2 ? (
                  <Icon name="columns" size={30} color="white" />
                ) : (
                  <Icon name="th" size={30} color="white" />
                )}
              </TouchableOpacity>


               
              <FlatList
                data={pastWorkouts}
                numColumns={amount}
                key={amount}
                keyExtractor={(item,index) => `${item.Name}-${item.WID}-${index}`}
                renderItem={({ item }) => {
                  return amount === 3 ? (
                    <TouchableOpacity
                      className="bg-blue2 p-2 rounded-[5px] m-1 w-[30%]"
                      onPress={() => router.push({ pathname: "/past-workout", params: { data: JSON.stringify(item) } })}
                    >
                      <Text className="text-white w-[100%]" numberOfLines={1} ellipsizeMode="tail">{item.Name}</Text>
                      <View className="flex-row mt-1 items-center">
                          <Icon name="calendar" size={15} color={"white"} />
                          <Text className="text-white ml-1">{formattedDate(item.CDate)}</Text>
                        </View>
                    </TouchableOpacity>
                  ) : amount === 2 ? (
                    <TouchableOpacity
                      className="bg-blue2 p-2 rounded-[5px] m-1 w-[48%]"
                      onPress={() => router.push({ pathname: "/past-workout", params: { data: JSON.stringify(item) } })}
                    >
                      <View className="flex-row items-center justify-between">
                          <Text className="text-white font-bold text-xl w-[80%]" numberOfLines={1} ellipsizeMode="tail" >{item.Name}</Text>
                        {item.Saved ? <Icon name="cloud" size={20} color={"white"} /> : null}
                      </View>
                      <View className="flex-row mt-1 items-center">
                        <Icon name="calendar" size={15} color={"white"} />
                        <Text className="text-white ml-1">{formattedDate(item.CDate)}</Text>
                      </View>
                      <View className="flex-row mt-1 items-center">
                        <Icon name="clock-o" size={17} color={"white"} />
                        <Text className="text-white ml-1">{formatMinutes(item.Duration)}</Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      className="bg-blue2 p-2 rounded-[5px] m-1 w-[98%] justify-center"
                      onPress={() => router.push({ pathname: "/past-workout", params: { data: JSON.stringify(item) } })}
                    >
                      <View className="flex-row items-center justify-between">
                        <Text className="text-white font-bold text-xl">{item.Name}</Text>
                        {item.Saved ? <Icon name="cloud" size={20} color={"white"} /> : null}
                      </View>
    
                      <View className="flex-row justify-between">
                        <View className="flex-row mt-1 items-center">
                          <Icon name="calendar" size={15} color={"white"} />
                          <Text className="text-white ml-1">{formattedDate(item.CDate)}</Text>
                        </View>
                        <View className="flex-row mt-1 items-center">
                          <Icon name="clock-o" size={17} color={"white"} />
                          <Text className="text-white ml-1">{formatMinutes(item.Duration)}</Text>
                        </View>
                      </View>
                      <View className="flex-wrap flex-row">
                        {createExerciseSummary(item.SID).map((item, index) => (
                          <View key={`${exercises[item.Name - 1].Name}-${index}`} className="bg-blue-500 m-1 p-1 rounded-[5px]">
                            <Text className="text-white">
                              {exercises[item.Name - 1].Name} {item.Info}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
           
            </View>
          ) : (
            <View className="bg-blue2 rounded-[5px] p-2 h-[150px] justify-center">
              <TouchableOpacity className="justify-center items-center" onPress={() => router.push("/create-plans")}>
                <Text className="text-center text-white font-bold m-2 text-xl">{"No Data Yet :("}</Text>
              </TouchableOpacity>
            </View>
          )}
              {/* Gradient below */}
              <View>
              {(amount == 1 || (amount == 2 && pastWorkouts.length >= 5) || (amount == 3 && pastWorkouts.length >= 10) )?(
              <Svg height="40" width="100%" className="absolute bottom-0 left-0 right-0 z-10">
                <LinearGradient id="fadeBottom" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="100%" stopColor="rgba(18, 18, 18, 1)" stopOpacity="1" />
                  <Stop offset="0%" stopColor="rgba(18, 18, 18, 1)" stopOpacity="0" />
                </LinearGradient>
                <Rect x="0" y="0" width="100%" height="40" fill="url(#fadeBottom)" />
              </Svg>):null
              }
              </View>
              
    
         
        </View>
      );
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