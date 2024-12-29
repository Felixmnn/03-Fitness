import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { UserPlan } from "../../../context/currentPlan";
import { TouchableOpacity } from 'react-native';
import exercises from "../../../constants/exercises"
import { router } from 'expo-router';
import { Alert } from 'react-native';
import uuid from "react-native-uuid"
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../../../components/CustomTextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../../components/CustomButton';
import { Svg, Rect,LinearGradient, Stop } from 'react-native-svg';

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
      let p = "";
      let bg = "";
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
    <KeyboardAvoidingView
              className="bg-black p-2 justify-between"
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
    >
      <View className="flex-1">
      <View>


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
      </View>

      

      <View className="flex-1 mb-1">
        <Text className="text-2xl text-white font-bold mt-5">
          Exercises:
        </Text>
        <FlatList
          data={currentPlan.EIDs}
          keyExtractor={(item,index) => `${item.toString()}-${index.toString()}`}
          renderItem={({ item, index }) => {
            const e = exercises.find(ex => ex.EID === item);
            if (e) {
              return (
                <View className="flex-row justify-between items-center bg-blue2 my-1 rounded-[5px]">
                      <View className="flex-row items-center my-2 ml-2 p-1">
                        {/*<Image source={e.Image} className="mr-2 h-[70px] w-[70px]"/>*/}
                        <Text className="text-xl text-white font-bold ">{e.Name}</Text>

                      </View>
                      
                      <TouchableOpacity onPress={ ()=> removeEID(index)}>
                      <View className="bg-red-900 rounded-full w-[30px] h-[30px] items-center justify-center m-2">
                        <Icon name="trash-o" size={20} color="black"/>
                      </View>
                      </TouchableOpacity>
                </View>
            )}
            return null;
          }}
        ListFooterComponent={
          

          <CustomButton
          title={"Add Exercise"}
          handlePress={() => router.push("/exercise-picker")}
          textStyles={"text-white "}
          containerStyles={"bg-blue2 my-2 mb-5"}

          />
        }
      />
      <Svg height="40" width="100%" className="absolute bottom-0 left-0 right-0 z-10">
        <LinearGradient id="fadeBottom" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="100%" stopColor="rgba(18, 18, 18, 1)" stopOpacity="1" />
          <Stop offset="0%" stopColor="rgba(18, 18, 18, 1)" stopOpacity="0" />
        </LinearGradient>
        <Rect x="0" y="0" width="100%" height="40" fill="url(#fadeBottom)" />
      </Svg>
      </View>
      </View>
      <CustomButton
        title={"Save Plan"}
        handlePress={saveCurrentPlan}
        containerStyles={"bg-blue2"}
        textStyles={"text-white"}
      />
     
      
    

    </KeyboardAvoidingView>
  );}


export default CreatePlan;
