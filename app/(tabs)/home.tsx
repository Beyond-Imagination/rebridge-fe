import styled from 'styled-components/native'

import { MainSearch } from '@/components/mainSearch'
import {TrainCenterSimpleList} from '@/components/trainCenterSimpleView'

const MainView = styled.ScrollView`
    background-color: #ff6c3ecc;
`

const Home = () => {
    return (
        <MainView>
            <MainSearch />
            <TrainCenterSimpleList />
        </MainView>
    )
}

export default Home
