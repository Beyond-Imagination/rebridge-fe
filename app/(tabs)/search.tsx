import { Text, View } from 'react-native'
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/core'

interface ParamList extends ParamListBase {
    search: {
        searchText: string
        tagList: string[]
    }
}

const Search = () => {
    const route = useRoute<RouteProp<ParamList, 'search'>>()
    const { searchText, tagList } = route.params
    return (
        <View>
            <Text>search tab</Text>
            <Text>{searchText}</Text>
            {tagList.map(tag => (
                <Text key={tag}>{tag}</Text>
            ))}
        </View>
    )
}

export default Search
