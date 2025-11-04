import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ user, setUser ] = useState(null);
    const [isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        try {
            AsyncStorage.getItem("noAccountWanted").then((value) => {
                if (value === "true") {
                    setIsLoggedIn(false);
                    setUser(null);
                    setIsLoading(false);
                    router.replace("/home");
                }})
            getCurrentUser()
            .then((res) =>{
                if(res) {
                    setIsLoggedIn(true);
                    setUser(res)
                } else {
                    setIsLoggedIn(false)
                    setUser(null)
                }
            } )
            .catch ((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
        } catch (error){
            console.log(error)
        }
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    );



    


}

export default GlobalProvider;