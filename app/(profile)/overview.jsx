import { View, SafeAreaView } from 'react-native';
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


const ProfileOverview = () => {
  const { user, isLoggedIn, setUser } = useGlobalContext();

  const logout = async () => {
    await signOut();
    router.push("/sign-in");
  };

  const keys = async () => {
    // Erstelle ein Arbeitsblatt (Sheet) mit "Hello World"
    const ws = XLSX.utils.aoa_to_sheet([["Hello", "World"]]);

    // Erstelle eine Arbeitsmappe (Workbook)
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Konvertiere das Arbeitsbuch in binären Excel-Dateiformat (Array)
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Konvertiere den ArrayBuffer in eine Base64-codierte Zeichenkette
    const base64Data = Buffer.from(wbout).toString('base64');

    // Speicherort auf dem Gerät (Verzeichnis)
    const fileUri = FileSystem.documentDirectory + "hello_world.xlsx";

    try {
      // Schreibe die Datei im Base64-Format
      await FileSystem.writeAsStringAsync(fileUri, base64Data, { encoding: FileSystem.EncodingType.Base64 });

      // Benachrichtige den Benutzer
      Alert.alert('Erfolg', 'Die Excel-Datei wurde erfolgreich gespeichert!', [
        { text: 'OK' }
      ]);
    } catch (error) {
      console.error("Fehler beim Speichern der Datei:", error);
      Alert.alert('Fehler', 'Etwas ist schief gelaufen. Bitte versuche es erneut.', [
        { text: 'OK' }
      ]);
    }
  };
  
  
  const handleBackup = async () => {
    const planKey = 'Plan-510c5488-42f8-4fe2-b9a2-dc0b0b32287c'; // Beispiel-Schlüssel
    console.log(user.$id)
    const userID = user.$id;
    await genSync();
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
