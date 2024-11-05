import React, { createContext, useState } from "react";

// Erstelle den UserContext
export const UserPlan = createContext();

const initialPlan = {
  PID: "",
    Type: "Plan",
    Name: "",
    Description: "",
    EIDs: [],
    Difficulty: "Easy",
    Duration: 1,
    CDate: "",     // Creation Date
    LUDate: "",    // Last Use Date
    Keywords: [],
    Public: false,
    Saved: false,
    Bg:"bg-green-500"

}

// Erstelle einen UserProvider
export const UserProvider = ({ children }) => {
  const [currentPlan, setCurrentPlan] = useState(initialPlan);
  const resetCurrentPlan = ()=> {
    setCurrentPlan(initialPlan);
  }
  // Gib den Provider zurück
  return (
    <UserPlan.Provider value={{ currentPlan, setCurrentPlan,resetCurrentPlan }}>
      {children}
    </UserPlan.Provider>
  );
};