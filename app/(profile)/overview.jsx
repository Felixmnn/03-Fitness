import { View, SafeAreaView, Alert } from 'react-native';
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



const ProfileOverview = () => {
  const { user, isLoggedIn, setUser } = useGlobalContext();

  const logout = async () => {
    await signOut();
    router.push("/sign-in");
  };

  const keys = async () => {
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


 
    
    

  return (
    <SafeAreaView className="bg-black h-full items-center justify-center">
      <View className="justify-between flex-1">
        <View>
        <CustomButton title={"Fetch Plan"} containerStyles={"m-2"} handlePress={keys} />
        </View>

        <CustomButton title={"Logout"} containerStyles={"bg-red-900"} handlePress={logout} />
      </View>
    </SafeAreaView>
  );
};

export default ProfileOverview;
