import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBox from '../../components/NavBox'
import { icons } from '../../constants'
import { router } from 'expo-router'


const results = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <NavBox 
                  handlePress={() => router.push('/traininglist')}
                  title="My Log Book"
                  icon = {icons.eye}
                  /> 
          <NavBox handlePress={() => router.push('/analyse-training')}
                  title="Analyse Data"
                  icon = {icons.data}
                  /> 
          <NavBox handlePress={() => router.push('/experimental')}
                  title="Experimental"
                  icon = {icons.search}
                  /> 
        </ScrollView>    
      </SafeAreaView>
  )
}

export default results