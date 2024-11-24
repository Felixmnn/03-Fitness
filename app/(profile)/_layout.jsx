import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'


const ProfileLayout = () => {
  return (
    <>
      <Stack>
       
      
          <Stack.Screen name="details"
          options={{
            headerShown:false
          }}/>

          <Stack.Screen name="overview"
            options={{
              headerTitle: "Profile",
              headerStyle: {
                backgroundColor:"#0f0f0f"
              },
              headerTintColor: "white"
            }}/>
      </Stack>
    </>
  )
}

export default ProfileLayout