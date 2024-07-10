import { Text } from 'react-native'
import styled from 'styled-components/native'

const MainView = styled.ScrollView`
    background-color: #ff6c3ecc;
`

const home = () => {
    return (
        <MainView>
            <Text>home tab</Text>
        </MainView>
    )
}

export default home
