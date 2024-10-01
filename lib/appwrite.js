
import { Client,Account,ID, Avatars, Databases,Query } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.fitness.mylogbook",
    projectId: "66f63760000b6d7461c3",
    databaseId: "66f63da90030befd1530",
    userCollectionId: "66f63df8001eb4852585",
    traingplanCollectionId: "66f63e6700168e6f12c3",
    storageCollectionId: "66f64333002381434a66"

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
        throw new Error(error)
        }
}

export const signIn = async(email, password) => {
    try {
        //Wichtig Nicht Vergessen !!!
        //await account.deleteSession('current');    
        const session = await account.createEmailSession(email,password)
            return session;
        
    }  catch (error) {
        throw new Error (error)
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