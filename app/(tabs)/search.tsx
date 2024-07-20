import { useEffect, useState } from 'react'
import { Dimensions, GestureResponderEvent } from 'react-native'
import styled from 'styled-components/native'
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/core'
import { Shadow } from 'react-native-shadow-2'

import { LocationIcon } from '@/icon'
import { SearchModal } from '@/components/searchModal'
import { SearchResultType1 } from '@/components/searchResult'
import { SearchTarget } from '@/type'
import { CommonActions, useNavigation } from '@react-navigation/native'
import GoogleMaps from '@/components/GoogleMaps'

interface ParamList extends ParamListBase {
    search: SearchTarget
}

const screen = Dimensions.get('screen')

const ShadowStyle = styled(Shadow)`
    background-color: #ffffff;
    border-radius: 12px;
    border-color: #ffffff;
`

const MainView = styled.View`
    background-color: #ffffff;
    width: 100%;
    height: 100%;
`

const SearchBox = styled.View`
    background-color: #ffffff;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 50px;
    padding: 10px;
    width: 100%;
`

const SearchMain = styled.View`
    position: absolute;
    width: ${screen.width * 0.85}px;
    top: 15%;
    left: 50%;
    transform: translate(-${screen.width * 0.42}px);
`

const MapView = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
`

const Toggle = styled.TouchableOpacity``

const SearchText = styled.Text`
    color: #90909f;
    font-size: 15px;
    width: ${screen.width * 0.6}px;
`

const Search = () => {
    const route = useRoute<RouteProp<ParamList, 'search'>>()
    const navigator = useNavigation()
    const target = route.params
    const [showModal, setShowModal] = useState(false)
    const [nearbyModal, setNearbyModal] = useState(false)

    useEffect(() => {
        if (target.searchText !== '') {
            console.log(target)
            setShowModal(true)
        }
    }, [target])

    const onClose = () => {
        setShowModal(false)
        navigator.dispatch(CommonActions.navigate('search'))
    }

    const onPress = (event: GestureResponderEvent) => {
        event?.preventDefault()
        setNearbyModal(true)
    }

    return (
        <MainView>
            {(!showModal || !nearbyModal) && (
                <MapView>
                    <GoogleMaps marker={[]} />
                </MapView>
            )}
            <SearchMain>
                <ShadowStyle distance={3}>
                    <SearchBox>
                        <Toggle activeOpacity={1} onPress={() => setShowModal(true)}>
                            <SearchText>직업 훈련 기관 검색</SearchText>
                        </Toggle>
                        <Toggle activeOpacity={1} onPress={onPress}>
                            <LocationIcon width={20} height={20} />
                        </Toggle>
                    </SearchBox>
                </ShadowStyle>
            </SearchMain>
            {showModal && <SearchModal defaultTarget={target} onClose={onClose} />}
            {nearbyModal && <SearchResultType1 onClose={() => setNearbyModal(false)} target={target} />}
        </MainView>
    )
}

export default Search
