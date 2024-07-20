import { Text } from 'react-native'
import styled from 'styled-components/native'

interface Props {
    description: string
}

const MainView = styled.View`
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`

const MapNotLoaded = ({ description }: Props) => {
    return (
        <MainView>
            <Text> {description !== '' ? description : 'Loading...'} </Text>
        </MainView>
    )
}

export default MapNotLoaded
