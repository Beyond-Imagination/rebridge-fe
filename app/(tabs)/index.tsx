import styled from 'styled-components/native'

import { MainSearch } from '@/components/mainSearch'
import { TrainCenterSimpleList } from '@/components/trainCourseSimpleView'
import { TrainStatistic } from '@/components/trainStatistic'

const MainView = styled.ScrollView`
    background-color: #ffffff;
`

const SubView = styled.View`
    background-color: #ff6c3ecc;
`

const Index = () => {
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

export default Index
