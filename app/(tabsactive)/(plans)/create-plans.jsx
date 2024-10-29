import React, { useContext } from 'react';
import { View, Text, TextInput, SafeAreaView,Image,FlatList } from 'react-native';
import { UserPlan } from "../../../context/currentPlan";
import { TouchableOpacity } from 'react-native';
import exercises from "../../../constants/exercises"
import { icons } from '../../../constants';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import uuid from "react-native-uuid"
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePlan = () => {
  const { currentPlan, setCurrentPlan } = useContext(UserPlan);

  // Funktion, die den Namen im Plan-Objekt aktualisiert
  const updatePlanName = (input) => {
    setCurrentPlan((prevPlan) => ({
      ...prevPlan,
      Name: input,  // aktualisiere den Namen direkt
    }))}

  const updatePlanDescription = (input) => {
    setCurrentPlan((prevPlan) => ({
      ...prevPlan,
      Description: input,  // aktualisiere den Namen direkt
    }))};

  const updatePlanDuration = (input) => {
    setCurrentPlan((prevPlan) => ({
      ...prevPlan,
      Duration: input,  // aktualisiere den Namen direkt
    }))};

    
  
  const updatePlanDifficulty = () => {
    if (currentPlan.Difficulty === "Easy"){
      p = "Medium"
    } else if (currentPlan.Difficulty === "Medium"){
      p = "Hard"
    } else {
      p = "Easy"
    }
    setCurrentPlan((prevPlan) => ({
      ...prevPlan,
      Difficulty: p,
    }))
  }

  const removeEID = (indexToRemove)=> {
    const a = [...currentPlan.EIDs]
     a.splice(indexToRemove,1)

    setCurrentPlan((prevPlan) => ({
      ...prevPlan,
      EIDs: a,
    }))
  }

 
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

  const updatePlanCreationDate = () => {
    setCurrentPlan((prevPlan) => (
      {
      ...prevPlan,
      CDate: new Date(),
    }
  ));

  };
  
  const updatePlanLastUseDate = () => {
    setCurrentPlan((prevPlan) => ({
      ...prevPlan,
      LUDate: new Date(),
    }));
  };
  
  const updatePlanPID = () => {
    setCurrentPlan((prevPlan) => ({
      ...prevPlan,
      PID: uuid.v4(),
    }));};
  
  const saveCurrentPlan = async () => {
    const jsonValue = JSON.stringify(currentPlan);
    await AsyncStorage.setItem("Plan-" + currentPlan.PID ,jsonValue);
    console.log("Plan Gespeichert")

  }
  

  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <Text className="text-3xl text-white font-bold mb-4">Plan Name ändern</Text>
      
      {/* TextInput zum Eingeben des Plan-Namens */}
      <TextInput
        className="bg-white p-2 rounded"
        value={currentPlan.Name}               // Zeigt den aktuellen Namen aus dem State
        placeholder="Gib den Plan-Namen ein"   // Platzhalter, wenn Name leer ist
        onChangeText={updatePlanName}          // Aktualisiert den Namen bei jeder Eingabe
      />
      <TextInput
        className="bg-white p-2 rounded"
        value={currentPlan.Description}               // Zeigt den aktuellen Namen aus dem State
        placeholder="Gib eine Beschreibung ein"   // Platzhalter, wenn Name leer ist
        onChangeText={updatePlanDescription}          // Aktualisiert den Namen bei jeder Eingabe
      />
      <TextInput
        className="bg-white p-2 rounded"
        value={currentPlan.Duration}               // Zeigt den aktuellen Namen aus dem State
        placeholder="Gib eine schwierigkeit"   // Platzhalter, wenn Name leer ist
        onChangeText={updatePlanDuration}          // Aktualisiert den Namen bei jeder Eingabe
        keyboardType='numeric'
      />
      <TouchableOpacity
        onPress={updatePlanDifficulty}
        >
          <Text className="text-3xl text-white">{currentPlan.Difficulty}</Text>
      </TouchableOpacity>

      <FlatList
  data={currentPlan.EIDs}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item, index }) => {
    const e = exercises.find(ex => ex.EID === item);
    if (e) {
      return (
        <View className="flex-row">
              <Text className="text-3xl text-white">{e.Name}</Text>
              <TouchableOpacity onPress={ ()=> removeEID(index)}>
                <Image source={icons.eye}/>
              </TouchableOpacity>
        </View>
  )
      
    }
    return null;
  }}
  ListFooterComponent={
    <TouchableOpacity onPress={() => router.push("/exercise-picker")}>
      <Image className="m-5" source={icons.plus} />
    </TouchableOpacity>
  }
/>
    <TouchableOpacity onPress={async ()=> {
      
      if (finalCheck()){
        updatePlanPID()
        updatePlanLastUseDate()
        updatePlanCreationDate()
        await saveCurrentPlan();
        console.log("success")
        Alert.alert(
            "Erfolgreich",
            "Dein Worokout wurde gespeichert",
            [
              {
                text:"OK",
                onPress:()=> router.push("/")
              }
            ]

        )
      }


    }}
      >
      
      <Text className="text-3xl text-white">Test</Text>
    </TouchableOpacity>

      
    </SafeAreaView>
  );
};

export default CreatePlan;
