import { View, SafeAreaView, Alert, Text, Image } from 'react-native';
import React, { useContext } from 'react';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { backUpPlan, genSync, signOut } from '../../lib/appwrite';
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
            <TouchableOpacity className="flex-row items-center p-2 rounded-[5px] bg-blue-500 justify-center m-2 flex-1">
                <Icon name="cloud" size={30} color="white"/>
                <Text className="text-white font-bold m-2">Import Data</Text>
            </TouchableOpacity>
            </View>
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
