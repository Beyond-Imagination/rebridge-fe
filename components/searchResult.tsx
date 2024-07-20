import React, { useEffect, useRef, useState } from 'react'
import { ILocationObject, IMarker, SearchTarget } from '@/type'
import styled from 'styled-components/native'
import { Dimensions, Modal, ScrollView } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { Shadow } from 'react-native-shadow-2'

import { CarotDown, ChevronLeftIcon, ListIcon } from '@/icon'
import { getNearByCenters, searchTrainCenter } from '@/api'
import { TrainCenterList } from '@/components/trainCenterList'
import GoogleMaps from '@/components/GoogleMaps'
import * as Location from 'expo-location'

interface Props {
    onClose: () => void
    target: SearchTarget
}

interface ResultProps {
    isShow: boolean
}

const screen = Dimensions.get('screen')

const ShadowStyle = styled(Shadow)`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 12px;
    border-color: #ffffff;
`

const Loading = styled.ActivityIndicator`
    min-height: 200px;
    max-height: 200px;
    align-self: center;
`

const MainView = styled.View`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    z-index: -1;
`
const MapView = styled.View`
    position: absolute;
    width: 100%;
    height: 70%;
    z-index: -1;
`

const HeaderView = styled.View`
    width: 100%;
    background-color: #ffffff;
    padding-top: ${screen.height * 0.08}px;
`

const HeaderBox = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`

const ResultView = styled.View<ResultProps>`
    width: 100%;
    height: ${props => (props.isShow ? '40%' : '20%')};
    position: absolute;
    background-color: inherit;
    border-radius: 10px;
    padding-top: 10px;
    top: ${props => (props.isShow ? '40%' : '65%')};
    z-index: 1;
`

const ResultContent = styled.View`
    background-color: #ffffff;
    border-radius: 10px;
    padding-top: 10px;
    width: 100%;
`

const ResultTextBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: start;
    justify-content: start;
    border-color: #c6c6cf;
    border-bottom-width: 1px;
    padding-bottom: 15px;
`

const CloseButton = styled.TouchableOpacity`
    margin-left: 10px;
`

const ListButton = styled.TouchableOpacity`
    position: absolute;
    width: ${screen.width * 0.3}px;
    top: 60%;
    left: 50%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border-radius: 50px;
    border-color: #dcdce2;
    border-width: 1px;
    padding: 3px;
    z-index: 1;
    transform: translate(-${screen.width * 0.15}px);
`

const HeaderText = styled.Text`
    color: #90909f;
    font-size: 20px;
    margin-left: 10px;
    width: 80%;
`

const ListButtonText = styled.Text`
    font-size: 15px;
    margin-left: 5px;
`

const ResultText = styled.Text`
    font-size: 15px;
    font-weight: bold;
    margin-left: 20px;
    margin-right: 5px;
`

const InfoText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    align-items: center;
    text-align: center;
    padding-top: 20px;
`

export function SearchResultType1({ onClose }: Props) {
    const [location, setLocation] = useState<ILocationObject | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [showList, setShowList] = useState(false)

    useEffect(() => {
        ;(async () => {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                console.warn('location permission denied')
                return
            }
            const initPosition: ILocationObject = await Location.getCurrentPositionAsync()
            setLocation(initPosition)
            setIsLoaded(true)
        })()
    }, [])

    const { data } = useQuery({
        enabled: !!location && isLoaded,
        queryKey: [location?.coords.longitude, location?.coords.latitude],
        queryFn: () => getNearByCenters({ latitude: Number(location?.coords.latitude), longitude: Number(location?.coords.longitude) }),
    })

    const scrollRef = useRef<ScrollView>(null)
    const handleMarkerPress = (markerIndex: number) => {
        if (scrollRef.current && markerIndex >= 0) {
            scrollRef.current.scrollTo({ y: markerIndex * screen.height * 0.2, animated: true })
        }
    }
    return (
        <Modal>
            <HeaderView>
                <HeaderBox>
                    <CloseButton onPress={onClose}>
                        <ChevronLeftIcon width={28} height={28} />
                    </CloseButton>
                    <HeaderText>내 주변 훈련기관</HeaderText>
                </HeaderBox>
            </HeaderView>
            <MainView>
                <MapView>
                    <GoogleMaps marker={data ? data : []} onMarkPress={handleMarkerPress} />
                </MapView>
                {!showList && (
                    <ListButton activeOpacity={1} onPress={() => setShowList(true)}>
                        <ListIcon width={30} height={30} />
                        <ListButtonText>목록보기</ListButtonText>
                    </ListButton>
                )}
                <ResultView isShow={showList}>
                    <ShadowStyle distance={5}>
                        <ResultContent>
                            <ResultTextBox onPress={() => setShowList(!showList)} activeOpacity={1}>
                                {/*TODO: change sort value*/}
                                <ResultText>관련도순</ResultText>
                                <CarotDown width={20} height={20} />
                            </ResultTextBox>
                            {isLoaded && data ? (
                                data.length === 0 ? (
                                    <InfoText>검색 결과 없음</InfoText>
                                ) : (
                                    <TrainCenterList data={data} scrollRef={scrollRef} />
                                )
                            ) : (
                                <Loading />
                            )}
                        </ResultContent>
                    </ShadowStyle>
                </ResultView>
            </MainView>
        </Modal>
    )
}

export function SearchResultType2({ target }: Props) {
    const [showList, setShowList] = useState(false)
    const scrollRef = useRef<ScrollView>(null)
    const { data } = useQuery({
        enabled: !!target,
        queryKey: ['search', target],
        queryFn: () => searchTrainCenter(target),
        refetchOnWindowFocus: false,
    })

    const handleMarkerPress = (markerIndex: number) => {
        if (scrollRef.current && markerIndex >= 0) {
            scrollRef.current.scrollTo({ y: markerIndex * screen.height * 0.2, animated: true })
        }
    }

    return (
        <MainView>
            <MapView>
                <GoogleMaps marker={data ? (data as IMarker[]) : []} onMarkPress={handleMarkerPress} />
            </MapView>
            {!showList && (
                <ListButton activeOpacity={1} onPress={() => setShowList(true)}>
                    <ListIcon width={30} height={30} />
                    <ListButtonText>목록보기</ListButtonText>
                </ListButton>
            )}
            <ResultView isShow={showList}>
                <ShadowStyle distance={5}>
                    <ResultContent>
                        <ResultTextBox onPress={() => setShowList(!showList)} activeOpacity={1}>
                            {/*TODO: change sort value*/}
                            <ResultText>관련도순</ResultText>
                            <CarotDown width={20} height={20} />
                        </ResultTextBox>
                        {data ? (
                            data.length === 0 ? (
                                <InfoText>검색 결과 없음</InfoText>
                            ) : (
                                <TrainCenterList data={data} scrollRef={scrollRef} />
                            )
                        ) : (
                            <Loading />
                        )}
                    </ResultContent>
                </ShadowStyle>
            </ResultView>
        </MainView>
    )
}
