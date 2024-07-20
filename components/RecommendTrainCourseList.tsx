import React, { useRef, useState } from 'react'
import styled from 'styled-components/native'
import { useQuery } from '@tanstack/react-query'
import { Dimensions, ScrollView } from 'react-native'
import { Shadow } from 'react-native-shadow-2'

import { TrainCourseList } from './trainCourseList'
import { CarotDown, ListIcon, MapIcon } from '@/icon'
import { useAuthorization } from '@/provider'
import { getRecommendTrainCourseList } from '@/api'
import { IUserDetail, trainCourse } from '@/type'
import GoogleMaps from '@/components/GoogleMaps'

interface Props {
    user: IUserDetail
}

interface MapViewProps {
    data: trainCourse[]
    onClose: () => void
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

const Container = styled.ScrollView`
    background-color: #ffffff;
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
    height: 50%;
    z-index: -1;
`

const ResultView = styled.View`
    width: 100%;
    height: 55%;
    position: absolute;
    background-color: inherit;
    border-radius: 10px;
    padding-top: 10px;
    top: 40%;
    z-index: 1;
`

const ResultContent = styled.View`
    background-color: #ffffff;
    border-radius: 10px;
    padding-top: 10px;
    width: 100%;
`

const ButtonContainer = styled.View`
    align-items: flex-end;
    margin: 0;
`

const TitleText = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin: 10px;
`
const LoadingText = styled.Text`
    font-size: 18px;
    margin: 150px 0 20px 0;
    text-align: center;
`

const SubtitleText = styled.Text`
    font-size: 16px;
    margin: 10px;
`

const HighlightText = styled.Text`
    color: #ff6c3ecc;
    font-weight: bold;
`

const ButtonText = styled.Text`
    margin-left: 5px;
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

const StyledButton = styled.TouchableOpacity`
    border-radius: 15px;
    width: 90px;
    height: 30px;
    border: 1px solid #dcdce2;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    margin-bottom: 10px;
    flex-direction: row;
`

const ResultTextBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: start;
    justify-content: start;
    border-color: #c6c6cf;
    border-bottom-width: 1px;
    padding-bottom: 15px;
`

const ListButton = styled.TouchableOpacity`
    position: absolute;
    width: ${screen.width * 0.3}px;
    top: 35%;
    left: 50%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border-radius: 50px;
    border-color: #dcdce2;
    border-width: 1px;
    padding: 3px;
    z-index: 3;
    transform: translate(-${screen.width * 0.15}px);
`

function RecommendMapView({ data, onClose }: MapViewProps) {
    const scrollRef = useRef<ScrollView>(null)

    const handleMarkerPress = (markerIndex: number) => {
        if (scrollRef.current && markerIndex >= 0) {
            scrollRef.current.scrollTo({ y: markerIndex * screen.height * 0.2, animated: true })
        }
    }

    return (
        <MainView>
            <MapView>
                <GoogleMaps marker={data} onMarkPress={handleMarkerPress} />
            </MapView>
            <ListButton activeOpacity={1} onPress={onClose}>
                <ListIcon width={30} height={30} />
                <ListButtonText>목록보기</ListButtonText>
            </ListButton>
            <ResultView>
                <ShadowStyle distance={5}>
                    <ResultContent>
                        <ResultTextBox activeOpacity={1}>
                            {/*TODO: change sort value*/}
                            <ResultText>관련도순</ResultText>
                            <CarotDown width={20} height={20} />
                        </ResultTextBox>
                        <Container ref={scrollRef}>
                            <TrainCourseList data={data} size={20} />
                        </Container>
                    </ResultContent>
                </ShadowStyle>
            </ResultView>
        </MainView>
    )
}

export default function RecommendTrainCourseList({ user }: Props) {
    const [showMap, setShowMap] = useState(false)
    const { jwt } = useAuthorization()

    const { data, isLoading } = useQuery({
        queryKey: ['getRecommendTrainCourseList', jwt],
        queryFn: () => getRecommendTrainCourseList(jwt),
        enabled: !!jwt,
    })

    if (isLoading || !data) {
        return (
            <Container>
                <TitleText>
                    <HighlightText>{user.name}</HighlightText>님의 맞춤 훈련 과정
                </TitleText>
                <SubtitleText>사용자의 정보를 바탕으로 직업 훈련 기관을 추천해 드립니다</SubtitleText>
                <ButtonContainer>
                    <StyledButton>
                        <MapIcon width={24} height={24} />
                        <ButtonText>지도보기</ButtonText>
                    </StyledButton>
                </ButtonContainer>
                <LoadingText>
                    {user.name}님을 위한 맞춤 직업 훈련 기관을 {'\n'} 검색 중입니다...🌀
                </LoadingText>
                <Loading size="large" />
            </Container>
        )
    }

    if (!showMap) {
        return (
            <Container>
                <TitleText>
                    <HighlightText>{user.name}</HighlightText>님의 맞춤 훈련 과정
                </TitleText>
                <SubtitleText>사용자의 정보를 바탕으로 직업 훈련 기관을 추천해 드립니다</SubtitleText>
                <ButtonContainer>
                    <StyledButton onPress={() => setShowMap(true)}>
                        <MapIcon width={24} height={24} />
                        <ButtonText>지도보기</ButtonText>
                    </StyledButton>
                </ButtonContainer>
                {data && <TrainCourseList data={data.docs} size={18} />}
            </Container>
        )
    } else {
        return (
            <MainView>
                <RecommendMapView data={data.docs} onClose={() => setShowMap(false)} />
            </MainView>
        )
    }
}
