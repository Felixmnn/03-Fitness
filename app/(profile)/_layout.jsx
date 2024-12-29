import React from 'react'
import { Stack } from 'expo-router'


const ProfileLayout = () => {
  return (
    <>
      <Stack>
          <Stack.Screen name="profile-details"
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