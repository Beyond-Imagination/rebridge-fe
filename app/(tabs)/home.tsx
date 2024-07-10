import styled from 'styled-components/native'

import { MainSearch } from '@/components/mainSearch'

const MainView = styled.ScrollView`
    background-color: #ff6c3ecc;
`

const Home = () => {
    return (
        <MainView>
            <MainSearch />
        </MainView>
    )
}

export default Home
