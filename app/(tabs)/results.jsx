import { View, Text, FlatList, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBox from '../../components/NavBox'
import { icons, images } from '../../constants'
import { router } from 'expo-router'
import ProfilePicture from 'components/ProfilePicture';
import { TouchableOpacity } from 'react-native'
import WorkoutBox from '../../components/WorkoutBox'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { format } from 'date-fns';
import Main from '../../components/Main'
import Footer from '../../components/Footer'
import CustomButton from '../../components/CustomButton'
import Icon from 'react-native-vector-icons/FontAwesome';
import exercises from '../../constants/exercises'


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
    console.log(filteredKEys,"Hier sind die Keys")
    const workoutEntries = await AsyncStorage.multiGet(filteredKEys)

    const parsedWorkouts = workoutEntries.map(([key,value])=> JSON.parse(value))
    const sortWorkouts = parsedWorkouts.sort((a,b)=> new Date(b.CDate) - new Date(a.CDate))
    setPastWorkouts(sortWorkouts)
    
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
        Info: `${count} Sets`,
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
      <NavBox
        title= "Upcoming"
        icon = {icons.plus}
        handlePress={()=> {router.push("/experimental")}}
      />
    </View>
    )
    }

    const yourLastWorkouts = ()=> {
      return(
        <View className="justify-start flex-1">{
        (pastWorkouts.length > 0)?(
        <View className="justify-start  flex-1">
          <TouchableOpacity className="items-center justify-center my-2"onPress={()=> {(amount == 3 )? (setAmount(2)):((amount == 2)?setAmount(1):(setAmount(3)))}}>
            {(amount == 1)?(<Icon name="th-list" size={30} color="white"/>):
            (amount == 2)?(
              <Icon name="columns" size={30} color="white"/>
            ):(
              <Icon name="th" size={30} color="white"/>
            )}

          </TouchableOpacity>
          
          <FlatList
            data={pastWorkouts}
            numColumns={amount}
            key={amount}
            keyExtractor={(item) => `${item.Name}-${item.CDate}`}
            renderItem={({item})=>{
              return(
                (amount == 3 )?(
                <TouchableOpacity className="bg-blue2 p-2 rounded-[5px] m-1 w-[30%]" onPress={()=> router.push({pathname:"/past-workout",params:{data:JSON.stringify(item)}})}>
                
                  <Text className="text-white">{item.Name}</Text>
                  <Text className="text-white">{formattedDate(item.CDate)}</Text>
              
                </TouchableOpacity>):((amount == 2)?(
                  <TouchableOpacity className="bg-blue2 p-2 rounded-[5px] m-1 w-[48%]" onPress={()=> router.push({pathname:"/past-workout",params:{data:JSON.stringify(item)}})}>
                
                  <View className="flex-row items-center justify-between" >
                    <Text className="text-white font-bold text-xl">{item.Name}</Text>
                    {(item.Saved)?(<Icon name="cloud" size={20} color={"white"} />):null}
                  </View>
                  <Text className="text-white">{formattedDate(item.CDate)}</Text>
                  <Text className="text-white">{formatMinutes(item.Duration)}</Text>
              
                </TouchableOpacity>
                ):( <TouchableOpacity className="bg-blue2 p-2 rounded-[5px] m-1 w-[98%] justify-center" onPress={()=> router.push({pathname:"/past-workout",params:{data:JSON.stringify(item)}})}>
                <View className="flex-row items-center justify-between" >
                  <Text className="text-white font-bold text-xl">{item.Name}</Text>
                  {(item.Saved)?(<Icon name="cloud" size={20} color={"white"} />):null}
                </View>
                
                <View className="flex-row justify-between">
                <Text className="text-white">{formattedDate(item.CDate)}</Text>
                <Text className="text-white">{formatMinutes(item.Duration)}</Text>
                </View>
                <Text className="text-white font-bold">Exercises:</Text>
                <View className="flex-wrap flex-row">
                  {createExerciseSummary(item.SID).map((item,index)=>(
                    <View key={`${exercises[item.Name-1].Name}-${index}`} className="bg-blue-500 m-1 p-1 rounded-[5px]">
                    <Text className="text-white">{exercises[item.Name-1].Name}  {item.Info}</Text>
                    </View>
                  ))
                  }
                </View>
                

            
              </TouchableOpacity>))


            )}}/>
        </View>
      ):(<View className="bg-blue2 rounded-[10px] p-2 h-[150px] justify-center">
        <TouchableOpacity className="justify-center items-center" onPress={()=> {router.push("/create-plans")}}>
          <Text className="text-center text-white font-bold m-2 text-xl font-bold">{"No Data Yet :("}</Text>
        </TouchableOpacity>
    </View>)}</View>)
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