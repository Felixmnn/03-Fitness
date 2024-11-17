import { View, Text,ScrollView,FlatList } from 'react-native'
import React from 'react'

const CustomScrollView = ({components}) => {

  return (
    <View>
      <FlatList
      data = {components}
      horizontal={true}
      keyExtractor={(item,index)=> index.toString()}
      renderItem={({item})=> {
        
        return (

            <View>{item}</View>
        )
        }}
      />
    </View>
  )
}

export default CustomScrollView