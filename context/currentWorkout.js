
import React, { createContext, useState } from "react";

export const UserWorkout = createContext();


export const WorkoutProvider = ({ children }) => {
    const [currentWorkout, setCurrentWorkout] = useState({
    WID:"",
    TPID:"",
    Type:"Workout",
    Name:"",
    Selected:{EID:0,Name:"Choose Exercise",Image:""},
    EIDs:[],      //{EID:1,Sets:0}
    SID:[],     //EID,Reps,Weight
    CDate:"",     //Creation Date
    STime:"",    
    ETime:" ",
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