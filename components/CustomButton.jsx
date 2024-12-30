import { TouchableOpacity, Text } from 'react-native'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
    onPress={handlePress}
    activeOpacity={0.7}
    className={ `bg-blue2 rounded-[5px] min-h-[30] justify-center items-center p-[10px] ${containerStyles} ${isLoading ? 'opacity-50' : ""}`}
    disabled = {isLoading}>
      <Text className= {`text-primary font-psemibold text-lg ${textStyles}`} >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton

