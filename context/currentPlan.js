import React, { createContext, useState } from "react";

// Erstelle den UserContext
export const UserPlan = createContext();

// Erstelle einen UserProvider
export const UserProvider = ({ children }) => {
  const [currentPlan, setCurrentPlan] = useState({
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
  });

  // Gib den Provider zurück
  return (
    <UserPlan.Provider value={{ currentPlan, setCurrentPlan }}>
      {children}
    </UserPlan.Provider>
  );
};