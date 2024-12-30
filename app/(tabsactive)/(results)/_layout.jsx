import React from 'react'
import { Stack } from 'expo-router'

const AnalysisLayout = () => {
    return (
        <>
          <Stack>
              <Stack.Screen name="analyse-training"
                options={{
                headerShown:false
              }}/>
            <Stack.Screen name="experimental"
              options={{
                headerTitle: "Upcoming",
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

export default AnalysisLayout