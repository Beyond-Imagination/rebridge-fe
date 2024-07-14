import styled from 'styled-components/native'

import { MainSearch } from '@/components/mainSearch'
import { TrainCenterSimpleList } from '@/components/trainCenterSimpleView'
import { TrainStatistic } from '@/components/trainStatistic'

const MainView = styled.ScrollView`
    background-color: #ffffff;
`

const SubView = styled.View`
    background-color: #ff6c3ecc;
`

const Home = () => {
    return (
        <MainView>
            <MainSearch />
            <SubView>
                <TrainCenterSimpleList />
                <TrainStatistic />
            </SubView>
        </MainView>
    )
}

export default Home
