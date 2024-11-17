import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView,Image,FlatList } from 'react-native';
import { UserPlan,resetContext } from "../../../context/currentPlan";
import { TouchableOpacity } from 'react-native';
import exercises from "../../../constants/exercises"
import { icons } from '../../../constants';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import uuid from "react-native-uuid"
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../../../components/CustomTextInput';
import Icon from 'react-native-vector-icons/FontAwesome';

const CreatePlan = () => {
  const { currentPlan, setCurrentPlan,resetCurrentPlan } = useContext(UserPlan);

  //Diese Funktion wird beim erstellen eines Plans Initialisiert und schaftt eine Basis.
  useEffect(()=>{
    setCurrentPlan((prevPlan) =>({
      ...prevPlan,
      PID:uuid.v4(),
      CDate: new Date(),
      LUDate: new Date(),
      Difficulty: "Easy",
      Bg:"bg-green-800",
    }))},[])



    // Funktion, die den Namen im Plan-Objekt aktualisiert
    const updatePlanName = (input) => {
      setCurrentPlan((prevPlan) => ({
        ...prevPlan,
        Name: input,  
    }))}

    //Funktion, die die Beschreibung im Plan-Objekt akualisiert
    const updatePlanDescription = (input) => {
      setCurrentPlan((prevPlan) => ({
        ...prevPlan,
        Description: input, 
    }))};

    //Funktion, die die Dauer aktualisiert
    const updatePlanDuration = (input) => {
      setCurrentPlan((prevPlan) => ({
        ...prevPlan,
        Duration: input,  // aktualisiere den Namen direkt
      }))};

    
    //Funktion, die die Schwierigkeit aktualisiert
    const updatePlanDifficulty = () => {
      if (currentPlan.Difficulty === "Easy"){
        p = "Medium"
        bg = "bg-red-300"
      } else if (currentPlan.Difficulty === "Medium"){
        p = "Hard"
        bg = "bg-red-900"
      } else {
        p = "Easy"
        bg = "bg-green-800"
      }
      setCurrentPlan((prevPlan) => ({
        ...prevPlan,
        Difficulty: p,
        Bg:bg
      }))}

      //Funktion, die die Übungen Aktualisiert

      const removeEID = (indexToRemove)=> {
        const a = [...currentPlan.EIDs]
        a.splice(indexToRemove,1)

        setCurrentPlan((prevPlan) => ({
          ...prevPlan,
          EIDs: a,
        }))
      }

      //Funktion welche Prüft ob alle Eingaben korrekt sind.
      const finalCheck = () => {
        let result = false
        // Prüfen, ob Name nicht definiert ist oder kürzer als 3 Zeichen ist
        if (currentPlan.Name === undefined || currentPlan.Name.length < 3) {
          Alert.alert("Eingabefehler","Prüfe deinen Namen")
        } else if (currentPlan.Description === undefined || currentPlan.Description.length < 3)  {
          Alert.alert("Eingabefehler","Prüfe deine Beschreibung")
        } else if ( currentPlan.Duration === undefined || currentPlan.Duration <= 1){
          Alert.alert("Eingabefehler","Prüfe deine Dauer")
        } else if (currentPlan.EIDs === undefined || currentPlan.EIDs.length <= 0){
          Alert.alert("Eingabefehler","Prüfe deine Übungen")
        } else{
          result = true
        }
        return result
      };

  
 
      //Funktion, zum speichern des Plans im asynchronen Speicher
      const saveCurrentPlan = async () => {
        const jsonValue = JSON.stringify(currentPlan);
        await AsyncStorage.setItem("Plan-" + currentPlan.PID ,jsonValue);
        const x = await AsyncStorage.getItem("Plan-" + currentPlan.PID)
        console.log(x)
        resetCurrentPlan()
        console.log("Plan Gespeichert")
        router.push("/")

      }
  

  return (
    <SafeAreaView className="bg-black h-full p-4">
      <Text className="text-3xl text-white text-center font-bold m-5">Create Plan</Text>
      
      <Text className="text-2xl text-white font-bold mb-1">
        Details:
      </Text>

        <CustomTextInput
        title={currentPlan.Name}
        placeholder={"Enter a Name"}
        handlingChange={updatePlanName}
        
        />
        <CustomTextInput
        title={currentPlan.Description}
        handlingChange={updatePlanDescription}
        placeholder={"Enter a Description"}

        />
      

      <View className="flex-row items-center justify-between">

        <CustomTextInput
        title={currentPlan.Duration}
        keyType="numeric"
        placeholder={"Duration"}
        handlingChange={updatePlanDuration}
        width={"mr-2 w-[50%]"}
        
        />


        <TouchableOpacity onPress={updatePlanDifficulty} className={   ` justify-center border border-[3px] border-blue2 rounded-[10px] h-[50px] w-[48%] ${currentPlan.Bg}`}>
            <Text className= "text-white text-xl font-bold text-center" >{currentPlan.Difficulty}</Text>
        </TouchableOpacity>
      </View>
      

      
      <Text className="text-2xl text-white font-bold mt-5">
        Exercises:
      </Text>
      <FlatList
        data={currentPlan.EIDs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const e = exercises.find(ex => ex.EID === item);
          if (e) {
            return (
              <View className="flex-row justify-between items-center bg-blue2 my-2 rounded-[10px]">
                    <View className="flex-row items-center my-2 ml-2">
                      <Image source={e.Image} className="mr-2 h-[70px] w-[70px]"/>
                      <Text className="text-xl text-white font-bold w-[50%]">{e.Name}</Text>

                    </View>
                    
                    <TouchableOpacity onPress={ ()=> removeEID(index)}>
                    <View className="bg-red-900 rounded-full w-[35px] h-[35px] items-center justify-center m-2">
                      <Icon name="trash-o" size={25} color="black"/>
                    </View>
                    </TouchableOpacity>
              </View>
          )}
          return null;
        }}
      ListFooterComponent={
        <TouchableOpacity onPress={() => router.push("/exercise-picker")} className="bg-blue2 p-3 justify-center items-center my-2 rounded-[10px]">

          <Text className="text-xl text-white font-bold">Add Exercise</Text>
        </TouchableOpacity>
      }
    />
   
      <TouchableOpacity onPress={saveCurrentPlan} className=" bg-blue2 rounded-[10px] p-2 justify-center items-center mt-5 mb-2 h-[50px]">
        <Text className="text-xl text-white font-bold">Safe Plan</Text>
      </TouchableOpacity>
      
    

      
    </SafeAreaView>
  );}


export default CreatePlan;
