import { View, Text, FlatList, TextInput, Alert } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import exercises from "../../constants/exercises";
import { Image } from "react-native";
import { useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";
import { UserPlan, resetContext } from "../../context/currentPlan";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import CustomButton from "../../components/CustomButton";
import { deletePlan } from "../../lib/appwrite";
import Toast from "react-native-toast-message";
import { Svg, Rect,LinearGradient, Stop } from 'react-native-svg';

const EditWorkout = () => {
  //Übergabe der Startpareameter über router:
  const { data } = useLocalSearchParams();
  const planObject = data ? JSON.parse(data) : null;

  //Zugriff auf Gloables Objekt:
  const { currentPlan, setCurrentPlan, resetCurrentPlan } =
    useContext(UserPlan);

  //Initialisierung der Globalen Plan Variable
  useEffect(() => {
    console.log(planObject);
    setCurrentPlan((prevPlan) => ({
      ...prevPlan,
      PID: planObject.PID,
      Type: planObject.Type,
      Name: planObject.Name,
      Description: planObject.Description,
      EIDs: planObject.EIDs,
      Difficulty: planObject.Difficulty,
      Duration: planObject.Duration,
      Public: planObject.Public,
      Saved: planObject.Saved,
      CDate: planObject.CDate,
      LUDate: new Date(),
    }));
  }, []);

  //Funktionen zu ändern der Globalen Werte

  const changeName = (newName) => {
    setCurrentPlan((prevPlan) => ({
      ...prevPlan,
      Name: newName,
    }));
  };
  const changeDescription = (newDescription) => {
    setCurrentPlan((prevPlan) => ({
      ...prevPlan,
      Description: newDescription,
    }));
  };
  const changeExercises = (newExercises) => {
    setCurrentPlan((prevPlan) => ({
      ...prevPlan,
      EIDs: newExercises,
    }));
  };

  //Prüfen ob gerade Bearbeitet wird
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingD, setIsEditingD] = useState(false);
  const [isSure, setIsSure] = useState(false);

  //Abrage ob der Nutzer Sich sicher ist. Das Workout wird gelöscht.
  const ensureOpinion = async () => {
    Alert.alert(
      "Confirmation",
      "Do you really want to delete this Plan?",
      [
        {
          text: "Yes",
          onPress: async () => {
            deletePlan(planObject.DataBaseID);
            await AsyncStorage.removeItem(`Plan-${planObject.PID}`);
            resetCurrentPlan();
            Toast.show({
                        type: 'success', 
                        position: 'top',
                        text1: `Plan has been Deleted`, 
                      });
            router.push("/"); // Zurück zur vorherigen Seite navigieren
          },
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      { cancelable: false },
    );
  };

 

  const safePlan = async () => {
    await AsyncStorage.setItem(
      `Plan-${planObject.PID}`,
      JSON.stringify(currentPlan),
    );
  };

  const getKeys = async () => {
    const x = await AsyncStorage.getItem(
      `Plan-fe34bbb2-5e78-4642-865a-51617ab9efdc`,
    );
    console.log(x);
  };

  return (
    <View className="bg-black h-full">
      <View className="bg-blue2 m-2 p-2 rounded-[5px]">
      <View className="flex-row items-center justify-center  mx-2">
        <View className="flex-1">
          {isEditing ? (
            <View className="flex-row justify-center items-center">
              <CustomTextInput
                title={currentPlan.Name}
                placeholder="New Name"
                handlingChange={(newName) => { 
                  changeName(newName);
                }}
              />
              <TouchableOpacity
                className="ml-1"
                onPress={() => {
                  setIsEditing(!isEditing);
                }}
              >
                <Icon name="check-circle" size={30} color="#7F1D1D" />
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-row justify-center items-center">
              <TouchableOpacity
                onPress={() => {
                  setIsEditing(!isEditing);
                }}
              >
                <Text className="text-3xl text-white font-bold text-center">
                  {" "}
                  {currentPlan.Name}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <View>
        {isEditingD ? (
          <View>
            <View className="flex-row justify-between items-center  mx-2">
              <Text className="text-xl text-white font-bold text-center">
                Description:
              </Text>
              <TouchableOpacity
                className="justify-center items-center"
                onPress={() => {
                  setIsEditingD(!isEditingD);
                }}
              >
                <Icon name="check-circle" size={30} color="#7F1D1D" />
              </TouchableOpacity>
            </View>
            <View className="bg-blue2 h-[2px] w-full mb-3"></View>
            <CustomTextInput
              title={currentPlan.Description}
              placeholder="New Description"
              handlingChange={(newDescription) =>
                changeDescription(newDescription)
              }
            />
          </View>
        ) : (
            <TouchableOpacity
                className="mx-2"
                onPress={() => {
                  setIsEditingD(!isEditingD);
                }}
              >
              <View className="flex-row justify-between items-center">
                <Text className="text-xl text-white font-bold">
                  Description:
                </Text>
                <Icon name="edit" size={25} color ="#7F1D1D"/>

              </View>
              <Text className="text-white font-bold  mb-3">
                {currentPlan.Description}
              </Text>
            </TouchableOpacity>
        )}
      </View>
      </View>

        <View className="flex-1 bg-blue2 mb-2 mx-2 p-2 rounded-[5px]">
      <View className="bg-blue2 h-[2px] w-full"></View>

      <FlatList
        className="flex-1"
        data={currentPlan.EIDs}
        keyExtractor={(index) => index.toString()}
        renderItem={({ index, item }) => {
          return (
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center m-3">
              {/*<Image source={exercises[item-1].Image} className="h-[70px] w-[70px] mr-1"/>*/}

                <Text className="text-white text-xl">
                  {exercises[item - 1].Name}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  const newExerciseList = [...currentPlan.EIDs];
                  newExerciseList.splice(index, 1);
                  changeExercises(newExerciseList);
                }}
                className="bg-red-900 rounded-full w-[30px] h-[30px] items-center justify-center mr-2"
              >
                <Icon name="trash-o" size={20} color="black" />
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <Svg height="50" width="100%" className="absolute bottom-0 left-2 right-0">
              <LinearGradient id="fadeBottom" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="100%" stopColor="rgba(0, 53, 102, 1)" stopOpacity="1" />
                <Stop offset="0%" stopColor="rgba(0, 53, 102, 1)" stopOpacity="0" />
              </LinearGradient>
              <Rect x="0" y="0" width="100%" height="50" fill="url(#fadeBottom)" />
      </Svg>
      </View>
      


      <CustomButton
      textStyles={"text-white "}
      containerStyles={"bg-blue2 mx-2"}
      title={"Add Exercise"}
      handlePress={() => {
        router.push("/exercise-picker");
      }}
      />

      <View className="flex-row justify-center mt-2">
        <CustomButton
        textStyles={"text-white"}
        containerStyles={"bg-blue2 ml-2 my-2 w-[46%]"}
        handlePress={
          async () => {
            await safePlan();
            resetCurrentPlan();
            router.push("/");
            console.log(currentPlan);
          }}
        title={"Save Plan"}
        />

        <CustomButton
        textStyles={"text-white"}
        containerStyles={"mr-2 my-2 ml-2 bg-red-900 w-[46%]"}
        handlePress={ensureOpinion}
        title={"Delete Plan"}
        />
      </View>
    </View>
  );
};

export default EditWorkout;
