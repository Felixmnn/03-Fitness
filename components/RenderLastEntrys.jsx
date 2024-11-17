import { View, Text,FlatList } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';

const exerciseEntrys = [
    { "Date": "06-11-2024", "EID": 4, "Notes": "", "Reps": "20", "WarmUp": "bg-black", "Weight": "20" },
    { "Date": "06-11-2024", "EID": 4, "Notes": "Focus on form", "Reps": "15", "WarmUp": "bg-blue", "Weight": "25" },
    { "Date": "04-11-2024", "EID": 4, "Notes": "", "Reps": "12", "WarmUp": "bg-red", "Weight": "30" },
    { "Date": "04-11-2024", "EID": 4, "Notes": "Felt good", "Reps": "5", "WarmUp": "bg-black", "Weight": "5" },
    { "Date": "04-11-2024", "EID": 4, "Notes": "Felt good", "Reps": "10", "WarmUp": "bg-yellow", "Weight": "35" },
    { "Date": "03-11-2024", "EID": 4, "Notes": "Increase weight next time", "Reps": "8", "WarmUp": "bg-green", "Weight": "40" },
    { "Date": "03-11-2024", "EID": 4, "Notes": "Good session", "Reps": "10", "WarmUp": "bg-black", "Weight": "45" },
    { "Date": "03-11-2024", "EID": 4, "Notes": "", "Reps": "10", "WarmUp": "bg-blue2", "Weight": "45" }

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
            if (exerciseEntrys[i].Date !== datetoday && date1 === ""){
                date1 = exerciseEntrys[i].Date;
            }else if (exerciseEntrys[i].Date !== datetoday && exerciseEntrys[i].Date !== date1 ){
                date2 = exerciseEntrys[i].Date
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
            
              <View className={` bg-blue-500 rounded-[5px] p-1 px-2 m-1 flex-row items-center justify-center`}>
              <View className="mx-[5px] flex-row ">
              <Text className="text-white font-bold">{`${item.Weight} Kg | ${item.Reps} Reps`}</Text>
             
              </View>
              
              <View >
                {
                  (item.WarmUp !== "bg-black")? (<View className="mr-2"><Icon name="fire" size={15} color="white" /></View>) : (<></>)
                } 
                </View>
                <View className="items-center">
                {
                  (item.Notes !== "")? (<View className="mr-2"><Icon name="sticky-note" size={15} color="white" /></View>) : (<></>)
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