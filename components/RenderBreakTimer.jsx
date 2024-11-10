import { View, Text, Touchable } from 'react-native'
import React from 'react'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useState } from 'react';
import CustomButton from './CustomButton';
import { TextInput } from 'react-native-web';
import { TouchableOpacity } from 'react-native';


const RenderBreakTimer = () => {
    const [timerDuration, setTimerDuration] = useState(120)
    const [startTimerDuration, setStartTimerDuration] = useState()
    const [ showTImeChoices, setShowTimeChoices ] = useState(false)
    const s = "bg-black my-[3px] rounded-[5px] py-1"
    const [isPlaying, setIsPlaying] = useState(false);
    const [key, setKey] = useState(0); 

    const resetTimer = (startTimerDuration) => {
      setTimerDuration(startTimerDuration)
      setKey(prevKey => prevKey +1)
    }

    const children = (remainingTime) => {
      
      const minutes = Math.floor(remainingTime/60)
      
      const seconds = remainingTime%60

      return `${minutes < 10  ? `0${minutes}` : `${minutes}`}:${seconds=== 0? `00`: seconds}`

    }

 

  
    
  return (
    <View>
      <View className="items-center justify-between m-3 flex-row">
            <CountdownCircleTimer
            key = {key}
            isPlaying
            duration={timerDuration}
            onComplete={() => ({ shouldRepeat: false })}
            colors="red"
            strokeWidth={12}
            size={180}
            >
                
                {({remainingTime}) => (
                    remainingTime === 0?(<Text className="text-white font-bold text-3xl">Fertig</Text>):
                    (<Text className="text-white font-bold text-3xl">{children(remainingTime)}</Text>)

                )}
                
            </CountdownCircleTimer>
            <View className="items-center justify-center"> 
                <CustomButton title={"01:00"} handlePress={()=>{setTimerDuration(60);setStartTimerDuration(60);resetTimer(60)}} containerStyles={s} textStyles="text-white"/>
                <CustomButton title={"02:00"} handlePress={()=>{setTimerDuration(120);setStartTimerDuration(120);resetTimer(120)}} containerStyles={s} textStyles="text-white"/>
                <CustomButton title={"05:00"} handlePress={()=>{setTimerDuration(300);setStartTimerDuration(300);resetTimer(300)}} containerStyles={s} textStyles="text-white"/>
                <CustomButton title={"Reset"} handlePress={()=>{resetTimer(startTimerDuration)}} containerStyles="bg-[#9f0000] my-[3px] rounded-[5px] py-1" textStyles="text-white"/> 
            </View>
      </View>
      
    
        


      
    </View>
  )
}

export default RenderBreakTimer