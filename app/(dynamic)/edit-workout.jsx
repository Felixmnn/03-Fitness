import { View, Text, FlatList, TextInput, Alert } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import exercises from '../../constants/exercises'
import { Image } from 'react-native'
import { useState } from 'react'
import CustomTextInput from "../../components/CustomTextInput"
import { UserPlan,resetContext } from '../../context/currentPlan'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'

const EditWorkout = () => {


  //Übergabe der Startpareameter über router:
  const { data } = useLocalSearchParams();
  const planObject = data? JSON.parse(data) : null;

  //Zugriff auf Gloables Objekt:
  const {currentPlan, setCurrentPlan,resetCurrentPlan} = useContext(UserPlan)


  //Initialisierung der Globalen Plan Variable
  useEffect(()=>{
    setCurrentPlan ((prevPlan)=>({
      ...prevPlan,
      PID:planObject.PID,
      Type:planObject.Type,
      Name:planObject.Name,
      Description:planObject.Description,
      EIDs:planObject.EIDs,
      Difficulty:planObject.Difficulty,
      Duration:planObject.Duration,
      Public:planObject.Public,
      Saved:planObject.Saved,
      CDate:planObject.CDate,
      LUDate:new Date(),
    }))
  },[])


  

  //Funktionen zu ändern der Globalen Werte

  const changeName = (newName)=>{
    setCurrentPlan((prevPlan)=>({
      ...prevPlan,
      Name:newName,
    }))
  }
  const changeDescription = (newDescription)=>{
    setCurrentPlan((prevPlan)=>({
      ...prevPlan,
      Description:newDescription,
    }))
  }
  const changeExercises = (newExercises)=>{
    setCurrentPlan((prevPlan)=>({
      ...prevPlan,
      EIDs:newExercises,
    }))
  }

  //Prüfen ob gerade Bearbeitet wird
  const [isEditing,setIsEditing] = useState(false)
  const [isEditingD,setIsEditingD] = useState(false)
  const [isSure, setIsSure] = useState(false)

  //Abrage ob der Nutzer Sich sicher ist. Das Workout wird gelöscht.
  const ensureOpinion = async () => {
    Alert.alert(
        "Confirmation",
        "Do you really want to delete this Plan?",
        [
            {
                text: "Yes",
                onPress: async () => {
                    await deletePlan();
                    resetCurrentPlan()
                    router.push("/"); // Zurück zur vorherigen Seite navigieren
                },
            },
            {
                text: "No",
                style: "cancel",
            }
        ],
        { cancelable: false }
    );
};
  
  const deletePlan = async () => {
    await AsyncStorage.removeItem(`Plan-${planObject.PID}`)
  }

  const safePlan = async () => {
    await AsyncStorage.setItem(`Plan-${planObject.PID}`,JSON.stringify(currentPlan))
  }

  const getKeys = async () =>{
    const x = await AsyncStorage.getItem(`Plan-fe34bbb2-5e78-4642-865a-51617ab9efdc`)
    console.log(x)
  }

  return (
    <SafeAreaView className="bg-black h-full">
        <View className="">
          <View className="flex-row items-center  mx-2 my-5">

            <View className="flex-1">
              {isEditing? 
              (
                <View className="flex-row justify-between items-center">
              <CustomTextInput
              title={currentPlan.Name}
              placeholder="Choose a Name"
              handlingChange={(newName)=> {
                changeName(newName)
              }}
              />
              <TouchableOpacity onPress={()=> {setIsEditing(!isEditing)}}>
                <Icon name="check-circle" size={30} color ="red"/>
              </TouchableOpacity>
              </View>
              ):
              (
                <View className="flex-row justify-between items-center">
                <Text className="text-3xl text-white font-bold text-center"> {currentPlan.Name}</Text>
                <TouchableOpacity onPress={()=> {setIsEditing(!isEditing)}}>
                <Icon name="edit" size={30} color ="red"/>
                </TouchableOpacity>
                </View>

                )}
            </View>

            
          </View>


        <View>
          {isEditingD? (
          <View>
          <View className="flex-row justify-between items-center  mx-2">
              <Text className="text-xl text-white font-bold text-center">Description:</Text>
              <TouchableOpacity className="justify-center items-center" onPress={()=> {setIsEditingD(!isEditingD)}}>
                    <Icon name="check-circle" size={30} color ="red"/>
              </TouchableOpacity>
          </View>
              <View className="bg-red-900 h-[2px] w-full mb-3"></View>
              <CustomTextInput
              title={currentPlan.Description}
              placeholder="Select a great Descirption"
              handlingChange={(newDescription)=> changeDescription(newDescription)}
              />
        </View>
        
        ):

           (
            <View>
              <View className="flex-row justify-between items-center  mx-2">
                  <Text className="text-xl text-white font-bold text-center">Description:</Text>
                  <TouchableOpacity className="justify-center items-center" onPress={()=> {setIsEditingD(!isEditingD)}}>
                    <Icon name="edit" size={30} color ="red"/>
                  </TouchableOpacity>
              </View>
                  <View className="bg-red-900 h-[2px] w-full mb-3"></View>
                  <Text className="text-white font-bold  mx-2 mb-3">
                  {currentPlan.Description}
                  </Text>
            </View>
            )}
        
        </View>
          


          <Text className="text-3xl text-white font-bold mx-2">Exercises:</Text>
          <View className="bg-red-900 h-[2px] w-full mb-3"></View>
          
          <FlatList
          className="h-[50%]"
          data = {currentPlan.EIDs}
          keyExtractor= {(item,index) => index.toString()}
          renderItem={({index,item})=>{
            return (
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center m-2">

                <Image source={exercises[item-1].Image} className="h-[70px] w-[70px] mr-1"/>
                <Text className="text-white text-xl">{exercises[item-1].Name}</Text>
                </View>
                <TouchableOpacity 
                onPress={()=> {
                  const newExerciseList = [...currentPlan.EIDs]
                  newExerciseList.splice(index, 1)
                  changeExercises(newExerciseList)
                }}

                className="bg-red-900 rounded-full w-[35px] h-[35px] items-center justify-center">
                     <Icon name="trash-o" size={25} color="black"/>
                </TouchableOpacity>

              </View>

            )
          }

          }
          
          
          />
          <View className="bg-red-900 h-[2px] w-full mb-3"></View>

          <TouchableOpacity className="border border-[3px] border-red-900 p-2 justify-center items-center"
          onPress={()=>{router.push("/exercise-picker")}}
          >
            <Text className="text-white text-xl">Add Exercise</Text>
          </TouchableOpacity>


          

            <View className="flex-row justify-between">
              <TouchableOpacity className="bg-blue2 p-2 m-5 w-[40%] justify-center items-center rounded-[5px]"
                onPress={ async ()=>{
                  await safePlan()
                  resetCurrentPlan()
                  router.push("/")
                  console.log(currentPlan)
                }}
              >
                <Text className="text-xl text-white font-bold" >Save Plan</Text>
              </TouchableOpacity>

              <TouchableOpacity className="p-2 m-5 bg-red-900 w-[40%] justify-center items-center rounded-[5px]" onPress={ensureOpinion}>
                <Text className="text-xl text-white font-bold ">Delete Plan</Text>
              </TouchableOpacity>              
            </View>
            
        </View>
    </SafeAreaView>
  )
}

export default EditWorkout