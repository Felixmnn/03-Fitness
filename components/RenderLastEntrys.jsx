import { View, Text,FlatList } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';

const exerciseEntrys = [
    { "D": "06-11-2024", "EID": 4, "N": "", "R": "20", "W": "bg-black", "W": "20" },
    { "D": "06-11-2024", "EID": 4, "N": "Focus on form", "R": "15", "W": "bg-blue", "W": "25" },
    { "D": "04-11-2024", "EID": 4, "N": "", "R": "12", "W": "bg-red", "W": "30" },
    { "D": "04-11-2024", "EID": 4, "N": "Felt good", "R": "5", "W": "bg-black", "W": "5" },
    { "D": "04-11-2024", "EID": 4, "N": "Felt good", "R": "10", "W": "bg-yellow", "W": "35" },
    { "D": "03-11-2024", "EID": 4, "N": "Increase weight next time", "R": "8", "W": "bg-green", "W": "40" },
    { "D": "03-11-2024", "EID": 4, "N": "Good session", "R": "10", "W": "bg-black", "W": "45" },
    { "D": "03-11-2024", "EID": 4, "N": "", "R": "10", "W": "bg-blue2", "W": "45" }

  ];


const RenderLastEntrys = () => {

    const getDates = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth()+1).padStart(2,"0");
        const day = String(currentDate.getDate()).padStart(2,"0");
        const formatedDate = `${day}-${month}-${year}`;
        return formatedDate;
      }

    const last2EntryDates = ()=> {
        const datetoday = getDates();
        let date1 = "";
        let date2 = "";

        for (let i= 0; i < exerciseEntrys.length; i++){
            if (exerciseEntrys[i].D !== datetoday && date1 === ""){
                date1 = exerciseEntrys[i].D;
            }else if (exerciseEntrys[i].D !== datetoday && exerciseEntrys[i].D !== date1 ){
                date2 = exerciseEntrys[i].D
                break;
            }
            }
            return {date1,date2}
        }
    

    const d = last2EntryDates()
    const date1 = d.date1
    const date2 = d.date2
    
    const filterArrays = ()=>{
        
        const firstDates = (exerciseEntrys.filter( item => item.Date === date1)).reverse();
        const secondDates = (exerciseEntrys.filter(item => item.Date === date2)).reverse();
        return ({firstDates,secondDates})
    }

    
    const f = filterArrays()
    const array1 = f.firstDates
    const array2 = f.secondDates


    const renderData = (array)=>{
      
      return (
        <View className="flex-row flex-wrap">
          { array.map((item,index)=>{
            return(
            
              <View key={`${item.EID}-${index}`}  className={` bg-blue-500 rounded-[5px] p-1 px-2 m-1 flex-row items-center justify-center`}>
              <View className="mx-[5px] flex-row ">
              <Text className="text-white font-bold">{`${item.W} Kg | ${item.Reps} Reps`}</Text>
             
              </View>
              
              <View >
                {
                  (item.W !== "bg-black")? (<View className="mr-2"><Icon name="fire" size={15} color="white" /></View>) : (<></>)
                } 
                </View>
                <View className="items-center">
                {
                  (item.N !== "")? (<View className="mr-2"><Icon name="sticky-note" size={15} color="white" /></View>) : (<></>)
                }
                </View>
            </View>)
          })

          }
        </View>
      )
    }



  return (
    <View>
        <Text className="text-white font-bold text-center">{date1}:</Text>
       <View>
        {renderData(array1)}
       </View>
        <Text className="text-white font-bold text-center">{date2}:</Text>
        
        <View>
        {renderData(array2)}
       </View>
        
    </View>
  )
}



export default RenderLastEntrys