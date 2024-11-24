import { View, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { signOut } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { client,databases } from '../../lib/appwrite';
import { Query } from 'react-native-appwrite';

const ProfileOverview = () => {
  const { user, isLoggedIn, setUser } = useGlobalContext();

  const logout = async () => {
    await signOut();
    router.push("/sign-in");
  };

  
  const createADocument = async () => {
    try{
      const response = await databases.createDocument(
        "66f63da90030befd1530",
        "6714f0f9000f25baa180",
        "unique()",
        {
          users: user.$id,
          WID: 'workout_001',        // Workout-ID
          TPID: 'trainingplan_001',  // Trainingsplan-ID
          Name: 'Full Body Workout', // Name des Trainingsplans
          Selected: 1,               // Beispiel für "ausgewählt"
          EIDs: ['eid_001', 'eid_002'], // IDs von Workouts, die mit dem Plan verknüpft sind
          SID: ['sid_001', 'sid_002'], // IDs von Sessions
          CDate: '2024-11-24',       // Erstellungsdatum
          Duration: '60',            // Dauer des Trainingsplans in Minuten
          Public: true,              // Öffentlich
          Saved: false,              // Noch nicht gespeichert
          UID: user.$id            // ID des Nutzers, der den Plan erstellt hat
        }
        

      )
      console.log("Success")
    }catch(error){
      console.log("Fehler",error)
    }
  }
  const fetchTrainingPlan = async () => {
    try {
      // Überprüfen, ob der Benutzer eine gültige ID hat
      
  
      // Abrufen der Trainingspläne, die dem aktuellen Benutzer zugeordnet sind
      console.log(user.$id)
      const response = await databases.listDocuments(
        "66f63da90030befd1530",            // Datenbank-ID
        "6714f0f9000f25baa180",       // Sammlung-ID für Trainingspläne
        [
          Query.equal('UID', user.$id) // Filtert Dokumente basierend auf der Benutzer-ID
        ]
      );
  
      if (response.documents.length > 0) {
        console.log('Gefundene Trainingspläne:', response.documents);
        return response.documents; // Gibt die Trainingspläne zurück
      } else {
        console.log('Kein Trainingsplan gefunden.');
      }
    } catch (error) {
      console.error('Fehler beim Abrufen des Trainingsplans:', error);
    }
  };
 

    

  return (
    <SafeAreaView className="bg-black h-full items-center justify-center">
      <View className="justify-between flex-1">
        <View>
        <CustomButton title={"Save Plan"} containerStyles={"m-2"} handlePress={createADocument} />
        <CustomButton title={"Fetch Plan"} containerStyles={"m-2"} handlePress={fetchTrainingPlan} />
        </View>

        <CustomButton title={"Logout"} containerStyles={"bg-red-900"} handlePress={logout} />
      </View>
    </SafeAreaView>
  );
};

export default ProfileOverview;
