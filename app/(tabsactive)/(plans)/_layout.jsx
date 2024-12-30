import React from 'react'
import { Stack } from 'expo-router'


const ActivePlansLayout = () => {
    return (
        <>
          <Stack>
              
              <Stack.Screen name="create-plans"
                          options={{
                            headerTitle: "Create Plan",
                            headerStyle: {
                              backgroundColor:"#0f0f0f",
                              borderBottomWidth: 0
                            },
                            headerTintColor: "white"
                          }}/>

               

          </Stack>
        </>
      )
    }

export default ActivePlansLayout