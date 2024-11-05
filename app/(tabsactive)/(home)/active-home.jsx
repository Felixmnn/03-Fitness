import { View, Text,SafeAreaView,Image, TextInput, FlatList } from 'react-native'
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
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomTextInput from '../../../components/CustomTextInput'
import exercises from '../../../constants/exercises'
import Icon from 'react-native-vector-icons/FontAwesome';

const ActiveHome = () => {
  //Funktion, welche den Context Initialisiert
  const { currentWorkout, setCurrentWorkout } = useContext(UserWorkout);

  //Funktion, Übergabe von der Workout ID beim öffnen der Seite
  const { data } = useLocalSearchParams();
  const planObject = data? JSON.parse(data) : null;

  //Funktion zum Initialieren des Workouts:
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

  //Funtkionen zum passiven setzen von Werten
  const [duration,setDuration] = useState(0);
  const [ selectedExercise, setSelectedExercise] =  useState(1);
  const [ currentWeight, setCurrentWeight ] = useState(0);
  const [ currentReps, setCurrentReps ] = useState(0);
  const [currentNotes, setCurrentNotes] = useState("")
  const [ warmUp , setWarmUp ] = useState("bg-black")

  //Functionen zum aktiven setzen von Werten
    const changeDuration = () => {
      setCurrentWorkout((prevWorkout) => ({
          ...prevWorkout,
          Duration: duration,
      }));};

    const handleWeightChange = (text) =>  {
      setCurrentWeight(text)
    }
    const handleRepChange = (text) =>  {
      setCurrentReps(text)
    }
    const handleNoteChange = (text) => {
      setCurrentNotes(text)
    }

    const getAmountPastSets = (id) => {
      return currentWorkout.SID.filter(item => item.EID === id).length
    }


    const getPastSets = (id) => {
      return currentWorkout.SID.filter(item => item.EID === id)
    }

    //Funktion zum Speichern des Workouts
    const safeWorkout = async ()=> {
      const jsonValue = JSON.stringify(currentWorkout)
      await AsyncStorage.setItem(`Workout-${currentWorkout.TPID}`,jsonValue)
      console.log("Locally Stored")
    }

    

  return (
    <SafeAreaView className ="bg-black h-full">
      <View className=" border-2 flex-1 m-2 justify-between ">
          

          <Text className="text-3xl text-white font-bold my-5 text-center">{currentWorkout.Name}</Text>

          <View className="justify-center items-center m-3">
            <TouchableOpacity 
              className="flex-row justify-center items-center border border-[3px] border-blue2 rounded-2 p-2 w-[60%]" 

              onPress={()=> {router.push("/progress-workout")}}
              >
                <Text className="text-3xl text-white font-bold my-2">Progress </Text>
                <Icon name="book" size={30} color="white"/>
              </TouchableOpacity>
          </View>
            

            <Text className="text-2xl text-white font-bold text-center mt-3">Selected Exercise:</Text>
          
        <View className="">
          


          <TouchableOpacity onPress={()=> {
            router.push("/active-exercise-picker")
          }}>
            <View className="border border-blue2 border-[3px] justify-between items-center flex-row my-2 rounded-[5px] w-full">
              <View className="flex-row justify-center items-center">
                <Image source={images.thumbnail} className="h-[70px] w-[70px] m-2"/>
                <View >
                  <Text className="text-xl text-white text-start"> {
                    (currentWorkout.Selected < 0) ? ("Choose Exercise") : (exercises[currentWorkout.Selected-1].Name)
                  } </Text>
                  <Text className=" ml-1 text-white text-start"> {
                  (currentWorkout.Selected < 0) ? ("Sets-") : (`Sets: ${getAmountPastSets(currentWorkout.Selected)}`)
                  }</Text>
                </View>
              </View>
              <View className="mr-3">
                <Icon name="retweet" size={30} color="white" />
              </View>
            </View>
          </TouchableOpacity>

          <View className="flex-row justify-between">
            <CustomTextInput
            placeholder="Weight"
            keyType='numeric'
            handlingChange={handleWeightChange}
            width="48%"

            />

            <CustomTextInput
            placeholder='Reps'
            keyType='numeric'
            handlingChange={handleRepChange}
            width="48%"

            />
          </View>

          <View className="flex-row justify-between">
            <CustomTextInput
            placeholder="Notes"
            handlingChange={handleNoteChange}
            width="60%"
            />

            <TouchableOpacity className={`flex-1 border border-[2px] border-blue2 rounded-[10px] m-1 justify-center items-center ${warmUp}`}
            onPress={()=> (warmUp === "bg-black")?(setWarmUp("bg-blue2")):(setWarmUp("bg-black"))}
            >
              <Text className="text-xl text-white font-bold">Warm Up</Text>
            </TouchableOpacity>
          </View>
          
          
          <CustomButton
          title="Safe set"
          containerStyles="bg-blue2 my-2"
          textStyles="text-white"
          handlePress={()=> {
            const set = {EID:currentWorkout.Selected,Reps:currentReps,Weight:currentWeight,Notes:currentNotes,WarmUp:warmUp}
            setCurrentWorkout((prevWorkout) => ({
              ...prevWorkout,
              SID:[...prevWorkout.SID,set]
            }))
            console.log(currentWorkout.SID)
          }}
          />

          <View>
            <Text className="text-white text-xl font-bold">Todays Sets:</Text>
            <FlatList
              data={getPastSets(currentWorkout.Selected)}
              keyExtractor={(item, index) => String(index)} 
              horizontal={true}
              renderItem={({ item }) => (
              
                <View className={` ${item.WarmUp} border border-blue2 border-[3px] rounded-[5px] py-1 px-2 w-[85px] m-1 flex-row`}>
                  <View className="mx-[5px]">
                  <Text className="text-white font-bold">{`${item.Weight} Kg`}</Text>
                  <Text className="text-white font-bold">{`${item.Reps} Reps`}</Text>
                  </View>
                  
                  <View>
                    {
                      (item.Notes !== "")? (<View className="mr-2"><Icon name="sticky-note" size={15} color="white" /></View>) : (<></>)
                    }
                    
                  </View>
                </View>
                
              )}
              
            />

          </View>
          <TouchableOpacity>
            <Text className="text-white text-center underline">more</Text>
          </TouchableOpacity>
            
        </View>

        <View className="  m-2 p-2 h-[100px] justify-center">
          <CustomButton
          handlePress={()=> {
            
            safeWorkout()
            setCurrentWorkout((prevWorkout)=> ({
              
              ...prevWorkout,
              WID:"",
              TPID:"",
              Name:"",
              Selected:-1,
              EIDs:[],     
              SID:[],     
              CDate:"",     
              STime:"",    
              Duration:"",
              Active:false,

            }))
            console.log("Values were reset")
            router.push("/")
            console.log(currentWorkout)
          
          }}

          textStyles="text-white"
          containerStyles="bg-red-900"
          title="Workout Beenden"
          />
        </View> 
        
        

      </View>
    </SafeAreaView>
  )
}

export default ActiveHome