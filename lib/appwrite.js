
import { Client,Account,ID, Avatars, Databases,Query, OAuthProvider } from 'react-native-appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
import { useEffect } from 'react';


export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.fitness.mylogbook",
    projectId: "66f63760000b6d7461c3",
    databaseId: "66f63da90030befd1530",
    userCollectionId: "66f63df8001eb4852585",
    traingplanCollectionId: "66f63e6700168e6f12c3",
    storageCollectionId: "66f64333002381434a66",
    workoutCollectionId:"6714f0f9000f25baa180",
    planCollectionId:"66f63e6700168e6f12c3"
    
} 

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases (client);

export { client, databases };



export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
          ID.unique(),
          email,
          password,
          username
        )

        if (!newAccount) throw Error;
            const avatarUrl = avatars.getInitials(username)
            await signIn(email,password)

            const newUser = await databases.createDocument(
                config.databaseId,
                config.userCollectionId,
                ID.unique(),
                {
                    accountId: newAccount.$id,
                    email,
                    username,
                    avatar:  avatarUrl
                }
            )
            return newUser;
        

    } catch (error) {
        console.log(error)
        }
}

export const signIn = async(email, password) => {
    try {
        //Wichtig Nicht Vergessen !!!
        //await account.deleteSession('current');    
        const session = await account.createEmailPasswordSession(email,password)
            return session;
        
    }  catch (error) {

        console.log(error)
    }
}

export const signOut = async ()=> {
    try {
        await account.deleteSession('current');
    }
    catch {
        console.log(error)
    }
}


export const getCurrentUser = async () => {
    try{
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0]

    } catch (error){
        console.log(error)
    }
}

export const sendRecoveryEmail = async () => {
    try {
        const recoveryUrl = 'http://localhost:3000/recovery'; // Achte darauf, dass diese URL korrekt ist und erreichbar ist
        
        const response = await account.createRecovery("felix.manemann2023@gmail.com", recoveryUrl);
        
        console.log('Recovery email sent successfully:', response);
    } catch (error) {
        console.log("Error sending recovery email", error);
    }
};

export const getAllEntries = async () =>  {
    try {
        const response = await databases.listDocuments(
            config.databaseId, // Deine Datenbank-ID hier einfügen
            config.workoutCollectionId
        );

        console.log('Einträge:', response.documents); // Gibt die Dokumente aus
    } catch (error) {
        console.error('Fehler beim Abrufen der Einträge:', error);
    }
}

export const getAllWorkouts = async () =>{
    try {
        const response = await databases.listDocuments(
            config.databaseId, // Deine Datenbank-ID hier einfügen
            config.workoutCollectionId
        );

        //console.log('Einträge:', response.documents); // Gibt die Dokumente aus
        return response.documents;

    } catch (error) {
        console.error('Fehler beim Abrufen der Einträge:', error);
    }
    return null;
}
export const getAllPlans = async () =>{
    try {
        const response = await databases.listDocuments(
            config.databaseId, // Deine Datenbank-ID hier einfügen
            config.planCollectionId
        );

        //console.log('Einträge:', response.documents); // Gibt die Dokumente aus
        return response.documents;

    } catch (error) {
        console.error('Fehler beim Abrufen der Einträge:', error);
    }
    return null;
}

export const deleteWorkout = async (documentId) => {
    try {
      await databases.deleteDocument(config.databaseId, config.workoutCollectionId, documentId);
      console.log('Eintrag erfolgreich gelöscht!');
    } catch (error) {
      console.error('Fehler beim Löschen des Eintrags:', error);
    }
  };

  export const deletePlan = async (documentId) => {
    try {
      await databases.deleteDocument(config.databaseId, config.planCollectionId, documentId);
      console.log('Eintrag erfolgreich gelöscht!');
    } catch (error) {
      console.error('Fehler beim Löschen des Eintrags:', error);
    }
  };



export const backUpWorkout = async ({workoutKey}) => {
    
    try {
        const currentUSer = await getCurrentUser();
        const userID = currentUSer.$id;
        const data = await AsyncStorage.getItem(workoutKey);
        const parsedData = JSON.parse(data);
        


        if (parsedData.Saved == false ){
            const response = await databases.createDocument(
                databaseId,
                workoutCollectionId,
                "unique()",
                {
                  users: userID,
                  WID: parsedData.WID,        // Workout-ID
                  TPID: parsedData.TPID,  // Trainingsplan-ID
                  Name: parsedData.Name, // Name des Trainingsplans
                  Selected: parsedData.Selected,               // Beispiel für "ausgewählt"
                  EIDs: [1,2,3], // IDs von Workouts, die mit dem Plan verknüpft sind
                  SID: JSON.stringify(parsedData.SID), // IDs von Sessions
                  CDate: parsedData.CDate,       // Erstellungsdatum
                  Duration: parsedData.Duration,            // Dauer des Trainingsplans in Minuten
                  Public: false,              // Öffentlich
                  Saved: true,              // Noch nicht gespeichert
                  UID: userID            // ID des Nutzers, der den Plan erstellt hat
                }
            );
            parsedData.DataBaseID = response.$id;
            parsedData.Saved = true;
            const updatedData = JSON.stringify(parsedData);
            await AsyncStorage.setItem(workoutKey,updatedData)
            console.log(`Das backup für ${workoutKey} wurde erfolgreich erstellt. `)
        }

    } catch (error) {
        console.log("Workout backups Error", error)
    }
}

export const backUpPlan = async ({planKey}) => {
    
    try {
        const currentUSer = await getCurrentUser();
        const userID = currentUSer.$id;
        const data = await AsyncStorage.getItem(planKey);
        const parsedData = JSON.parse(data);
        


        if (parsedData.Saved == false ){
            console.log(parsedData.Duration);
            const response = await databases.createDocument(
                databaseId,
                planCollectionId,
                "unique()",
                {
                  creator: userID,
                  PID: parsedData.PID,
                  Name: parsedData.Name, // Name des Trainingsplans
                  Description: parsedData.Description,
                  EIDs: parsedData.EIDs, // IDs von Workouts, die mit dem Plan verknüpft sind
                  Difficulty:parsedData.Difficulty,
                  CDate: parsedData.CDate,       // Erstellungsdatum
                  Duration: parsedData.Duration,            // Dauer des Trainingsplans in Minuten
                  Public: false,              // Öffentlich
                  Saved: true,              // Noch nicht gespeichert
                  Bg:parsedData.Bg,
                  UID: userID            // ID des Nutzers, der den Plan erstellt hat
                }
            );
           
            parsedData.DataBaseID = response.$id;
            parsedData.Saved = true;
            const updatedData = JSON.stringify(parsedData);
            
            await AsyncStorage.setItem(planKey,updatedData);
            console.log(`Das backup für ${planKey} wurde erfolgreich erstellt. `)
        }

    } catch (error) {
        console.log("Workout backups Error", error)
    }
}



export const genSync = async () => {
    try {
    const currentUSer = await getCurrentUser();
    const userID = currentUSer.$id;
      const keys = await AsyncStorage.getAllKeys();
      const planKeys = keys.filter((item) => item.includes("Plan"));
      const workoutKeys = keys.filter((item) => item.includes("Workout"));
  
      // Asynchron die Daten aus AsyncStorage abrufen
      const rawPlans = await Promise.all(planKeys.map(async (item) => AsyncStorage.getItem(item)));
      const rawWorkouts = await Promise.all(workoutKeys.map(async (item) => AsyncStorage.getItem(item)));
  
      // JSON-parsen der Daten
      const plans = rawPlans.map((item) => JSON.parse(item));
      const workouts = rawWorkouts.map((item) => JSON.parse(item));
  
      // Filtern der nicht synchronisierten Einträge
      const noSyncPlans = plans.filter((item) => item?.Saved === false);
      const noSyncWorkouts = workouts.filter((item) => item?.Saved === false);
  
      // Synchronisieren der Pläne
      for (const plan of noSyncPlans) {
        const planKey = `Plan-${plan.PID}`; // Annahme: PID ist ein Attribut von plan
        await backUpPlan({ planKey, userID });
      }
  
      // Synchronisieren der Workouts
      for (const workout of noSyncWorkouts) {
        const workoutKey = `Workout-${workout.WID}`; // Annahme: WID ist ein Attribut von workout
        await backUpWorkout({ workoutKey});
      }
      console.log("All Workouts and Plans are Savesd.")
    } catch (error) {
      console.log("Error while mass saving data", error);
    }
  };



