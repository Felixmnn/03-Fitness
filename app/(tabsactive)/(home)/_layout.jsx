import React from 'react'
import { Stack } from 'expo-router'

const ActiveHomeLayout = () => {
  return (
    <>
      <Stack>
          

          <Stack.Screen name="active-home"
            options={{
              headerTitle: "Workout Progress",
              headerStyle: {
                backgroundColor:"#0f0f0f"
              },
              headerTintColor: "white"
            }}/>
          </Stack>
    </>
  )
}

export default ActiveHomeLayout