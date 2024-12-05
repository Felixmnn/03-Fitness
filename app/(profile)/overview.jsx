import { View, SafeAreaView, Alert, Text, Image,ScrollView, ActivityIndicator } from 'react-native';
import React, { useContext, useState } from 'react';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { backUpPlan, genSync, getAllEntries, getAllPlans, getAllWorkouts, signOut } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { client,databases,backUpWorkout } from '../../lib/appwrite';
import { Query } from 'react-native-appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from '../../lib/appwrite';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import {  ContributionGraph } from 'react-native-chart-kit';
import SummaryChart from '../../components/SummaryChart';



const ProfileOverview = () => {
  const { user, isLoggedIn, setUser } = useGlobalContext();


  const logout = async () => {
    await signOut();
    router.push("/sign-in");
  };

  const excel = async () => {
      const data = [
        { Name: 'Max', Alter: 28, Stadt: 'Berlin' },
        { Name: 'Anna', Alter: 25, Stadt: 'Hamburg' },
        { Name: 'Tom', Alter: 30, Stadt: 'München' },
      ];
    
      // Konvertiere Daten in Excel
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    
      // Schreibe die Excel-Daten in eine Base64-codierte Datei
      const excelOutput = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });
    
      // Speichere die Datei auf dem Gerät
      const fileUri = `${FileSystem.documentDirectory}example.xlsx`;
      await FileSystem.writeAsStringAsync(fileUri, excelOutput, {
        encoding: FileSystem.EncodingType.Base64,
      });
    
      console.log(`Excel-Datei gespeichert unter: ${fileUri}`);
    
      // Überprüfe, ob das Teilen möglich ist
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          dialogTitle: 'Teile deine Excel-Datei',
        });
      } else {
        Alert.alert('Teilen nicht möglich', 'Sharing wird auf diesem Gerät nicht unterstützt.');
      }
    };

    const random = () =>{
      
      Toast.show({
        type: 'success', // oder 'error' für eine Fehlermeldung
        position: 'top',
        text1: `I did a thing`, // Text der Toast-Nachricht
      });
    }


    const commitsData = [
      { date: "2024-11-02", count: 1 },
      { date: "2024-11-03", count: 2 },
      { date: "2024-11-04", count: 3 },
      { date: "2024-11-05", count: 4 },
      { date: "2024-11-06", count: 5 },
      { date: "2024-11-30", count: 2 },
      { date: "2024-11-31", count: 3 },
      { date: "2024-11-01", count: 2 },
      { date: "2024-11-02", count: 4 },
      { date: "2024-11-05", count: 2 },
      { date: "2024-11-30", count: 4 }
    ];
    
    const chartConfig = {
      backgroundGradientFrom: "#000",
      backgroundGradientFromOpacity: 0.4,
      backgroundGradientTo: "#000",
      backgroundGradientToOpacity: 1,
      color: (opacity = 1) => `rgba(0, 150, 255, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };
    


    //@Exporting the Data
    const [isFetching, setIsFetching] = useState(false);

   

    const reduxProtection = async ({parsedKeys,plans,workouts}) => {
      await Promise.all(plans.map( async(plan) => {
        if (!(parsedKeys.some((object)=> object.includes(plan.PID)))){
          const newPlan = {
              PID: plan.PID,
              Name: plan.Name,
              Description: plan.Description,
              EIDs: plan.EIDs,
              Difficulty: plan.Difficulty,
              Duration: plan.Duration,
              CDate: plan.CDate,     // Creation Date
              Public: plan.Public,
              Saved: plan.Saved,
              Bg:plan.Bg
          
          }
          await AsyncStorage.setItem(`Plan-${plan.PID}`,JSON.stringify(newPlan));
          }
      }))
        
        
        await Promise.all(workouts.map( async(workout) => {
        if (!(parsedKeys.some((object)=> object.includes(workout.WID)))){
          const newWorkout = {
            WID: workout.WID,
            TPID:workout.TPID,
            Name:workout.Name,
            Selected:workout.Selected,
            EIDs:workout.EIDs,     
            SID:JSON.parse(workout.SID),     
            CDate:workout.CDate,     
            Duration:workout.Duration,
            Public:workout.Public,
            Saved:workout.Saved,
            Active:false,
          }
          await AsyncStorage.setItem(`Workout-${newWorkout.WID}`,JSON.stringify(newWorkout));
          console.log("Success?");
        }
        }))
      }
  

    const importData = async () => {
      console.log("I am doing something :)");
      setIsFetching(true);
      try {
        const plans = await getAllPlans();
        const workouts = await getAllWorkouts();
        console.log("Success",typeof plans[0]);
        console.log(typeof plans[0].PID);
        const parsedKeys = await AsyncStorage.getAllKeys();

        
        await reduxProtection({parsedKeys,plans,workouts});
        /*
        */
        //await AsyncStorage.setItem(`Plan-${plans[0].PID}`,plans[0].PID);
        //console.log("Added the first entry:",plans[0].PID)
        //const currentKeys = await AsyncStorage.getAllKeys();
        //console.log("Hier sind die Keys",currentKeys);

      } catch(error){
        console.log(error);
      }
      
      setIsFetching(false);


    }

    //@Exporting the Data
    
    

  return (
    <SafeAreaView className="bg-black h-full items-center justify-center">
      <View className="flex-1 w-[100%]">
        <View className="m-5 items-center justify-center ">
          <View className="w-[155px] h-[155px] rounded-full bg-blue2 items-center justify-center ">
            <Image source={(user.avatar)?({uri:`${user.avatar}`}):(images.profile)}  className="w-[150px] h-[150px] rounded-full "/> 
          </View>
            <Text className="text-white font-bold text-3xl">{user.username}</Text> 
        </View>
        <View className="flex-1 bg-blue2 rounded-t-[25px] p-2 justify-between items-center" >
          <View>
            <CustomButton title="Random Stuff" handlePress={()=> random()} containerStyles={"bg-white mx-2"} textStyles={"text-whiter"}/>
            <View className="flex-row justify-between w-full">
            <TouchableOpacity className="flex-row items-center p-2 rounded-[5px] bg-[#217346] justify-center m-2 flex-1" onPress={()=> excel()}>
                <Icon name="file-excel-o" size={30} color="white"/>
                <Text className="text-white font-bold m-2">Export Data</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            className={`flex-row items-center p-2 rounded-[5px] ${isFetching? 'opacity-50' : ""}  bg-blue-500 justify-center m-2 flex-1`}
            onPress={()=> importData()}
            disabled = {isFetching}
            >
              {
                (isFetching)?
                  (<ActivityIndicator size={"small"} color={"white"}/>):
                  <Icon name="cloud" size={30} color="white"/>
            }
                <Text className="text-white font-bold m-2">Import Data</Text>
            </TouchableOpacity>
            </View>
            <ScrollView   horizontal={true} 
                          contentContainerStyle={{ alignItems: 'center' }} 
            >
              <ContributionGraph
                values={commitsData}
                endDate={new Date("2025-01-01")}
                numDays={70}
                width={300}
                height={220}
                chartConfig={chartConfig}
              />
              
              
            </ScrollView>
          </View>
          <View> 
            <CustomButton title={"Logout"} containerStyles={"bg-red-900"} handlePress={logout} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileOverview;
