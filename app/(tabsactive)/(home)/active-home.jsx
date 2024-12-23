import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useContext } from "react";
import CustomButton from "../../../components/CustomButton";
import { TouchableOpacity } from "react-native";
import { icons, images } from "../../../constants";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { UserWorkout, WorkoutProvider } from "../../../context/currentWorkout";
import { useEffect } from "react";
import uuid from "react-native-uuid";
import { useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "../../../components/CustomTextInput";
import exercises from "../../../constants/exercises";
import Icon from "react-native-vector-icons/FontAwesome";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import RenderLastEntrys from "../../../components/RenderLastEntrys";
import RenderBreakTimer from "../../../components/RenderBreakTimer";
import Toast from "react-native-toast-message";
import { getAllEntries } from "../../../lib/appwrite";
import ShowPastWorkouts from "../../../components/ShowPastWorkouts";

const ActiveHome = () => {
  /*
Initialisierungsvariablen

*/

  const { data } = useLocalSearchParams();
  const planObject = data ? JSON.parse(data) : null;
  const { currentWorkout, setCurrentWorkout } = useContext(UserWorkout);

  useEffect(() => {
    if (planObject) {
      setCurrentWorkout((prevPlan) => ({
        ...prevPlan,
        WID: `Workout-${uuid.v4()}`,
        TPID: planObject.PID,
        Name: planObject.Name,
        EIDs: planObject.EIDs,
        SID: [],
        CDate: new Date(),
        Active: true,
        Saved: false,
      }));
    }
  }, [data]);

  useEffect(() => {
    const saveWorkoutData = async () => {
      if (currentWorkout && currentWorkout.Active) {
        // Check auf isActive
        await AsyncStorage.setItem(
          "ActiveWorkout",
          JSON.stringify(currentWorkout),
        );
      }
    };
    saveWorkoutData();
  }, [currentWorkout]); // Ausgeführt, wenn workoutData geändert wird

  const changeDuration = () => {
    const startTime = currentWorkout.CDate;
    const currentTime = new Date();
    const differenceInMilliseconds =
      currentTime.getTime() - new Date(startTime).getTime();
    setDuration(Math.floor(differenceInMilliseconds / 1000));
    const differenceInMinutes = Math.floor(
      differenceInMilliseconds / 60000,
    ).toString();
    setCurrentWorkout((prevWorkout) => ({
      ...prevWorkout,
      Duration: differenceInMinutes,
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeDuration();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const showDetailsNames = showDetails.flatMap((index) => {
      return exercises[index - 1].Name;
    });

    const getMatchingEntrys = async () => {
      const entrys = await AsyncStorage.multiGet(showDetailsNames);

      const parseEntrys = entrys.map((entry) => JSON.parse(entry[1]));
      return parseEntrys;
    };

    const fetchData = async () => {
      const e = await getMatchingEntrys(); // Warten, bis die Daten abgerufen sind
      setDetails(e);
    };

    fetchData();
  }, [showDetails]);

  //Speichern des Workouts:
  const setWorkoutInactive = async () => {
    await AsyncStorage.removeItem("ActiveWorkout");
  };

  const [duration, setDuration] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [currentReps, setCurrentReps] = useState(0);
  const [currentNotes, setCurrentNotes] = useState("");
  const [warmUp, setWarmUp] = useState("bg-black");

  /*Potentiell Unnötig
    const [ activeTimer, setActiveTimer] = useState(true)
    const [viewTimer ,setViewTimer ] = useState(false)
    const [ selectedExercise, setSelectedExercise] =  useState(1);
    const [ moreActive, setMoreActive ] = useState(false)
    const [viewProgress, setViewProgress] = useState(false)
    const safeSetButton = (item) =>{
      return (
        <CustomButton
                              title="Safe Set"
                              containerStyles="bg-blue2 pt-2 h-[41px] w-[32%]"
                              textStyles="text-white"
                              handlePress={async()=> {
                                  const set = {EID:item,R:currentReps,W:currentWeight,N:currentNotes,WarmUp:warmUp,D:getDates()}
                                  const exists = await checkIfAsyncEntry();
                                  if (exists) {
                                    await addAsyncEntry(set)
                                  } else {
                                    await setAsyncEntry();
                                    console.log("Ein Eintrag im Async Storage wurde erstellt")
                                    await addAsyncEntry(set);
                                  }
                                  console.log(pastExercises)
                      
                                  setCurrentWorkout((prevWorkout) => ({
                                    ...prevWorkout,
                                    SID:[...prevWorkout.SID,set]
                                  }))
                                  
                                  
                                  Toast.show({
                                    type: 'success', // oder 'error' für eine Fehlermeldung
                                    position: 'top',
                                    text1: `Added Set to Log`, // Text der Toast-Nachricht
                                  });
                                  setCurrentNotes("");
                                  setCurrentReps(0);
                                  setCurrentWeight(0);
                                }
                                }
                              />
      )
     }

*/

  //Funtkionen zum passiven setzen von Werten

  //Functionen zum aktiven setzen von Werten

  const handleWeightChange = (text) => {
    setCurrentWeight(text);
  };
  const handleRepChange = (text) => {
    setCurrentReps(text);
  };
  const handleNoteChange = (text) => {
    setCurrentNotes(text);
  };

  const getPastSets = (id) => {
    return currentWorkout.SID.filter((item) => item.EID === id);
  };

  const getDates = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formatedDate = `${day}-${month}-${year}`;
    return formatedDate;
  };

  const safeWorkout = async () => {
    console.log(
      "------------------------------------------------------------------------",
    );
    console.log("Duration is now a String");

    const jsonValue = JSON.stringify(currentWorkout);
    await AsyncStorage.setItem(`Workout-${currentWorkout.WID}`, jsonValue);
    console.log("Locally Stored");
    const processAllEntries = async (entrys) => {
      for (const entry of w) {
        await safeExercisesAsync(entry);
      }
    };
    const w = currentWorkout.SID;
    await processAllEntries(w);

    console.log("Saved Workout");

    console.log(
      "------------------------------------------------------------------------",
    );
  };

  const [pastExercises, setPastExercises] = useState([]);

  async function safeExercisesAsync(entry) {
    const exerciseName = exercises[entry.EID - 1].Name;
    const existingEntry = await AsyncStorage.getItem(exerciseName);
    if (existingEntry === null) {
      await AsyncStorage.setItem(exerciseName, JSON.stringify([entry]));
    } else {
      const parsedExistingEntry = JSON.parse(existingEntry);
      if (parsedExistingEntry.length >= 500) {
        const newArray = [entry, ...parsedExistingEntry.slice(0, 499)];
        await AsyncStorage.setItem(exerciseName, JSON.stringify(newArray));
      } else {
        const newArray = [entry, ...parsedExistingEntry];
        await AsyncStorage.setItem(exerciseName, JSON.stringify(newArray));
      }
    }
    console.log("successfull entry", entry);
  }

  /*
      Ab hier kommen alle header spezifischen Aspektete
      */

  function formatDuration() {
    if (!duration || duration <= 0) {
      return "00:00:00"; // Standardwert für nicht vorhandene oder leere Dauer
    }
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    return `${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
  }

  const header = () => {
    return (
      <View className=" flex-row mx-3 my-1 items-center justify-between">
        <Text className="text-white font-bold text-3xl">
          {currentWorkout.Name}
        </Text>
        <View className="flex-row items-center">
          <Text key={`${duration}`} className="text-white font-bold text-xl">
            {" "}
            {formatDuration()}{" "}
          </Text>
          <Icon name="clock-o" size={30} color="#fff" />
        </View>
      </View>
    );
  };

  const footer = () => {
    return (
      <View className="  mx-2 p-2 h-[100px] justify-center">
        <CustomButton
          handlePress={() => {
            const d = currentWorkout.Duration.toString();
            setCurrentWorkout((prevWorkout) => ({
              ...prevWorkout,
              Duration: d,
            }));
            safeWorkout();

            setCurrentWorkout((prevWorkout) => ({
              ...prevWorkout,
              WID: "",
              TPID: "",
              Name: "",
              Selected: -1,
              EIDs: [],
              SID: [],
              CDate: "",
              STime: "",
              Duration: "",
              Active: false,
            }));
            setWorkoutInactive();
            console.log("Values were reset");
            Toast.show({
              type: "success", // oder 'error' für eine Fehlermeldung
              position: "top",
              text1: `Workout was saved`, // Text der Toast-Nachricht
              containerStyle: {
                className: "bg-blue2 rounded-lg p-4",
              },
            });
            console.log("Finished Processing", currentWorkout);

            router.push("/");
          }}
          textStyles="text-white"
          containerStyles="bg-red-900 mx-1"
          title="Workout Beenden"
        />
      </View>
    );
  };

  /*
      Alles Ab hier ist für den Main Scroll view
      ----------------------------------------------------------------------------------------------------------------
      */
  const [showDetails, setShowDetails] = useState([]);
  const [showMoreDetails, setshowMoreDetials] = useState([]);
  const [showEvenMoreDetails, setshowEvenMoreDetails] = useState([]);
  const [details, setDetails] = useState([]);

  function changeDetailVisibility(ID) {
    console.log("Test");

    if (showDetails.includes(ID)) {
      setShowDetails(showDetails.filter((i) => i !== ID));
    } else {
      setShowDetails(showDetails.concat(ID));
    }
    console.log(showDetails);
  }
  function changeMoreDetailVisibility(ID) {
    if (showMoreDetails.includes(ID)) {
      setshowMoreDetials(showMoreDetails.filter((i) => i !== ID));
    } else {
      setshowMoreDetials(showMoreDetails.concat(ID));
    }
  }
  function changeEvenMoreDetailVisibility(ID) {
    if (showEvenMoreDetails.includes(ID)) {
      setshowEvenMoreDetails(showEvenMoreDetails.filter((i) => i !== ID));
    } else {
      setshowEvenMoreDetails(showEvenMoreDetails.concat(ID));
    }
  }

  const matchingExercises = (ID) => {
    return currentWorkout.SID.filter((item) => item.EID == ID);
  };

  /*
    Alles Ab hier ist für den Main Scroll view
    ----------------------------------------------------------------------------------------------------------------
    */

  /*
     const [array, setArray] = useState([
      { EID: 1, R: '11', W: "12", N: 'Top', Wa: "red", D: '11' },
      { EID: 2, R: '22', W: "13", N: 'Middle', Wa: "white", D: '12' },
      { EID: 3, R: '33', W: "14", N: 'Bottom', Wa: "red", D: '13' },
      { EID: 4, R: '44', W: "15", N: 'Other', Wa: "white", D: '14' },
    ]);
    */

  const [secondLastWorkout, setSecondLastWorkout] = useState([]);

  const getSecondLastWorkout = async (EID) => {
    const allItemsJSON = await AsyncStorage.getItem(exercises[EID - 1].Name);
    if (!allItemsJSON) return [];
    const allItems = JSON.parse(allItemsJSON);
    if (allItems.length === 0) return [];
    const matchingDate = new Date(allItems[0].D).toISOString().split("T")[0];
    const matchingExercises = allItems.filter(
      (item) => new Date(item.D).toISOString("T")[0] !== matchingDate,
    );
    const matchingSecondDate = new Date(matchingExercises[0].D)
      .toISOString()
      .split("T")[0];
    const matchingsecondExercises = allItems.filter(
      (item) => new Date(item.D).toISOString("T")[0] === matchingSecondDate,
    );
    if (matchingsecondExercises.length === 0) return [];
    console.log("Das wird gepseichert", matchingsecondExercises);
    setSecondLastWorkout((prevSecondLastWorkout) => [
      ...prevSecondLastWorkout,
      { EID: matchingsecondExercises },
    ]);
  };

  const removeLastWorkout = () => {};

  const removeSecondLastWorkout = () => {};

  const main = () => {
    const getAmountPastSets = (id) => {
      return currentWorkout.SID.filter((SID) => SID.EID === id).length;
    };

    const handleRepChange = (text, date) => {
      const updatedArray = [...currentWorkout.SID];
      const index = updatedArray.findIndex((item) => item.D === date);
      updatedArray[index].R = text;
      setCurrentWorkout({
        ...currentWorkout,
        SID: updatedArray,
      });
    };

    const handleWeightChange = (text, date) => {
      const updatedArray = [...currentWorkout.SID];
      const index = updatedArray.findIndex((item) => item.D === date);
      updatedArray[index].W = text;
      setCurrentWorkout({
        ...currentWorkout,
        SID: updatedArray,
      });
    };

    const handleWarmChange = (date) => {
      const updatedWorkout = { ...currentWorkout };
      const updatedSID = [...currentWorkout.SID];
      const index = updatedSID.findIndex((item) => item.D === date);
      if (updatedSID[index].Wa == "red") {
        updatedSID[index].Wa = "white";
      } else {
        updatedSID[index].Wa = "red";
      }
      updatedWorkout.SID = updatedSID;
      setCurrentWorkout(updatedWorkout);
    };

    const addTuple = (ID) => {
      console.log("Adding new Touple");
      const newTuple = {
        EID: ID,
        R: null,
        W: null,
        N: null,
        Wa: "white",
        D: new Date(),
      };
      setCurrentWorkout((prevState) => ({
        ...prevState,
        SID: [...prevState.SID, newTuple],
      }));
    };

    return (
      <View>
        {currentWorkout.EIDs.map((item, index) => {
          return (
            <View
              key={`${item}-${index}`}
              className="bg-blue2 rounded-[5px] w-[full]  mx-2 mt-2 justify-start"
            >
              <View className="flex-row p-2">
                {/*<Image source={exercises[item-1].Image} className="h-[60px] w-[60px]"/>*/}
                <View>
                  <Text className="text-white font-bold text-xl ml-2">
                    {exercises[item - 1].Name.length > 15
                      ? `${exercises[item - 1].Name.slice(0, 15)}...`
                      : exercises[item - 1].Name}
                  </Text>
                  <Text className=" ml-2 text-white text-start">
                    {!currentWorkout.SID.some((SID) => SID.EID === item)
                      ? "No Sets Today"
                      : `Sets: ${getAmountPastSets(item)}`}
                  </Text>
                </View>
              </View>

              <View>
                {showDetails.includes(item) ? (
                  <View>
                    <View className="flex-row justify-between mx-2">
                      <Text className="text-white font-bold">Set </Text>
                      <Text className="text-white font-bold">Kg</Text>
                      <Text className="text-white font-bold">Reps</Text>
                      <Text className="text-white font-bold">Warmup</Text>
                    </View>
                    {currentWorkout.SID.filter(
                      (object) => object.EID == item,
                    ).map((item, index) => {
                      return (
                        <View
                          key={`${item.D}-${index}`}
                          className={`flex-row ${index % 2 == 0 ? "bg-blue2" : "bg-[#023f77]"} mx-2 p-2 justify-between`}
                        >
                          <Text className="text-white font-bold text-xl">
                            {index}
                          </Text>
                          <TextInput
                            key={`${item.D}-${index}-Weight`}
                            className={`w-[30%] bg-white rounded-[5px] ${
                              index % 2 === 0 ? "bg-[#023f77]" : "bg-blue2"
                            } text-white text-center`}
                            keyboardType="numeric"
                            value={item.W}
                            placeholder="-"
                            placeholderTextColor={
                              index % 2 === 0 ? "#cccccc" : "#999999"
                            } // Setzt die Farbe des Platzhalter
                            onChangeText={(text) =>
                              handleWeightChange(text, item.D)
                            }
                          />
                          <TextInput
                            key={`${item.D}-${index}-Reps`}
                            className={`w-[30%] bg-white rounded-[5px] ${
                              index % 2 === 0 ? "bg-[#023f77]" : "bg-blue2"
                            } text-white text-center`}
                            keyboardType="numeric"
                            value={item.R}
                            placeholder="-"
                            placeholderTextColor={
                              index % 2 === 0 ? "#cccccc" : "#999999"
                            } // Setzt die Farbe des Platzhalters
                            onChangeText={(text) =>
                              handleRepChange(text, item.D)
                            }
                          />

                          <View className="flex-row">
                            <TouchableOpacity
                              className={` p-[2px] rounded-[5px] mr-1`}
                              onPress={() => handleWarmChange(item.D)}
                            >
                              <Icon
                                key={`${item.D}-${index}-WarmUp`}
                                name="check-circle"
                                size={25}
                                color={item.Wa === "red" ? "white" : "red"}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    })}

                    <TouchableOpacity
                      className=" m-3 "
                      onPress={() => addTuple(item)}
                    >
                      <Icon name="plus" size={30} color={"white"} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
              <View>
                {showDetails.includes(item) ? (
                  <ShowPastWorkouts EID={item} />
                ) : (
                  <></>
                )}
              </View>
              <TouchableOpacity
                className="mb-2 "
                onPress={() => changeDetailVisibility(item)}
              >
                {!showDetails.includes(item) ? (
                  <View className="justify-center items-center">
                    <Icon name="chevron-down" size={20} color="#fff" />
                  </View>
                ) : (
                  <View className="justify-center items-center">
                    <Icon name="chevron-up" size={20} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/exercise-picker",
              params: { name: "workout" },
            })
          }
          className="bg-blue2 rounded-[5px] p-2 justify-center items-center m-2"
        >
          <Text className="text-xl text-white font-bold">Add Exercies</Text>
        </TouchableOpacity>
      </View>
    );
  };

  /*
Display your Last Workout




*/

  const [lastWorkouts, setLastWorkouts] = useState([]);

  const getLastWorkout = async () => {
    const EID = 18;
    console.log("Startet er Überhaupt");

    const allItemsJSON = await AsyncStorage.getItem(exercises[EID].Name);
    console.log("Wo hört er auf", allItemsJSON);

    if (!allItemsJSON) return [];

    const allItems = JSON.parse(allItemsJSON);
    console.log("Wo hört er auf", allItems);

    if (allItems.length === 0) return [];

    const matchingDate = new Date(allItems[0].D).toISOString().split("T")[0];
    console.log("Wo hört er auf", matchingDate);

    const matchingExercises = allItems.filter(
      (item) => new Date(item.D).toISOString("T")[0] !== matchingDate,
    );
    console.log("Wo hört er auf", matchingExercises);

    if (matchingExercises.length === 0) return [];
    console.log("Das wird gepseichert", matchingExercises);
    setLastWorkouts((prevLastWorkouts) => [
      ...prevLastWorkouts,
      { EID: matchingExercises },
    ]);
    console.log("Das ist der UseState", lastWorkouts);
  };

  return (
    <KeyboardAvoidingView
      className="bg-black"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View>{header()}</View>
      <ScrollView className="flex-1">{main()}</ScrollView>
      <View>{footer()}</View>
    </KeyboardAvoidingView>
  );
};

export default ActiveHome;
