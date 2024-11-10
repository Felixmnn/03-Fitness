
import React, { createContext, useState } from "react";

export const UserWorkout = createContext();


export const WorkoutProvider = ({ children }) => {

    
    

    const [currentWorkout, setCurrentWorkout] = useState({
    WID:"",
    TPID:"",
    Type:"Workout",
    Name:"",
    Selected:-1,
    EIDs:[],     
    SID:[],     
    CDate:"",     
    STime:"",    
    Duration:"",
    Public:false,
    Saved:false,
    Active:false,

    
  })


  



   // Gib den Provider zurück
   return (
    <UserWorkout.Provider value={{ currentWorkout, setCurrentWorkout }}>
      {children}
    </UserWorkout.Provider>
  );
};