import { View, Text } from 'react-native'

const MapNotLoaded = ({description}) => {
    return (
        <View>
            <Text> { description ? description : 'Loading...'} </Text>
        </View>
    )
}

export default MapNotLoaded
