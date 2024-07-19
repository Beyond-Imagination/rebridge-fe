import React, { useState } from 'react'
import { Linking, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { useQuery } from '@tanstack/react-query'
import { Shadow } from 'react-native-shadow-2'

import { getTrainCourseDetail } from '@/api/trainCourse'
import { CrossButton, InfoIcon } from '@/icon'
import ModalNCS from '@/components/ModalNCS'
import { getNcsCodeDetail } from '@/api'

interface Props {
    courseId: string
    onClose: () => void
}

interface InfoProps {
    title: string
    content: string
}

const screen = Dimensions.get('screen')

const Loading = styled.ActivityIndicator`
    min-height: 600px;
    max-height: 600px;
    align-self: center;
`
const ShadowStyle = styled(Shadow)`
    background-color: #ffffff;
    border-radius: 12px;
    border-color: #ffffff;
`

// const ModalInnerContainer = styled.ScrollView`
//     flex: 0.8;
//     width: 90%;
//     background-color: white;
//     border-radius: 10px;
//     border-width: 1px;
//     border-color: gray;
//     padding: 20px;
// `
const ModalContainer = styled.Modal``

const ModalContentContainer = styled.ImageBackground`
    flex: 0.8;
    height: ${screen.height}px;
    align-items: center;
    justify-items: center;
    padding-top: 100px;
`

const CloseButtonContainer = styled.TouchableOpacity`
    width: 100%;
    align-items: flex-end;
`

const InfoBlock = styled.TouchableOpacity`
    margin-left: 5px;
`

const StyledButton = styled.TouchableOpacity`
    background-color: #ff6c3ecc;
    border-radius: 7px;
    width: 120px;
    height: 29px;
    margin-top: 40px;
    align-items: center;
    justify-content: center;
    margin-bottom: 100px;
`

const ModalInnerContainer = styled.View`
    background-color: #ffffff;
    border-radius: 6px;
    padding: 10px;
    width: ${screen.width * 0.9}px;
`

const InfoContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`

const InfoContentBlock = styled.View`
    width: ${screen.width * 0.6}px;
    flex-direction: row;
    align-items: center;
    border-color: #dcdce2;
    border-left-width: 1px;
    padding-left: 10px;
`

const ButtonContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const ContentBlock = styled.ScrollView``

const ModalTitle = styled.Text`
    font-weight: bold;
    font-size: 18px;
    text-align: left;
    margin-bottom: 30px;
    margin-top: 15px;
`

const MiddleTitle = styled.Text`
    font-weight: bold;
    font-size: 16px;
    text-align: left;
    margin: 20px 0 30px 10px;
`

const ButtonText = styled.Text`
    color: #ffffff;
    font-size: 12px;
    text-align-vertical: center;
`


const LoadingText = styled.Text`
  text-align: center;
  margin-top: 200px;
  font-size: 18px;
`

const InfoTitle = styled.Text`
    font-weight: bold;
    font-size: 16px;
    text-align: left;
    width: ${screen.width * 0.2}px;
    margin-left: 10px;
`

const InfoContent = styled.Text`
    font-size: 16px;
    text-align: left;
`

function InfoBox({ title, content }: InfoProps) {
    return (
        <InfoContainer>
            <InfoTitle>{title}</InfoTitle>
            <InfoContentBlock>
                <InfoContent>{content}</InfoContent>
            </InfoContentBlock>
        </InfoContainer>
    )
}

export default function TrainCourseDetailView({ courseId, onClose }: Props) {
    const [showModal, setShowModal] = useState(false)
    function numberWithCommas(number: number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const { data,isLoading } = useQuery({
        queryKey: ['trainCourseDetail', courseId],
        queryFn: () => getTrainCourseDetail(courseId),
        enabled: !!courseId,
        refetchOnWindowFocus: false,
    })

    const target = data?.ncsCd.split('(')[0]

    const { data: ncsDetail } = useQuery({
        queryKey: [target ?? ''],
        queryFn: () => getNcsCodeDetail(target ?? ''),
        enabled: !!courseId,
        refetchOnWindowFocus: false,
    })

    if (isLoading) {
        return (
            <ModalContainer visible={true} animationType="slide">
                <ModalContentContainer>
                    <ModalInnerContainer>
                        <CloseButtonContainer onPress={onClose}>
                            <CrossButton width={30} height={30} />
                        </CloseButtonContainer>
                        <LoadingText>훈련기관 상세정보 로딩중입니다...🌀</LoadingText>
                    </ModalInnerContainer>
                </ModalContentContainer>
            </ModalContainer>
        )
    }

    if (!data) {
        return (
            <ModalContainer>
                <ModalContentContainer source={require('../assets/images/detail-view-image.png')}>
                    <ShadowStyle distance={7}>
                        <ModalInnerContainer>
                            <CloseButtonContainer onPress={onClose}>
                                <CrossButton width={30} height={30} />
                            </CloseButtonContainer>
                            <Loading />
                        </ModalInnerContainer>
                    </ShadowStyle>
                </ModalContentContainer>
            </ModalContainer>
        )
    }

    return (
        <ModalContainer>
            <ModalContentContainer source={require('../assets/images/detail-view-image.png')}>
                <ShadowStyle distance={7}>
                    <ModalInnerContainer>
                        <CloseButtonContainer onPress={onClose}>
                            <CrossButton width={30} height={30} />
                        </CloseButtonContainer>
                        <ContentBlock>
                            <ModalTitle>{data.title}</ModalTitle>
                            <InfoBox title={'훈련기관명'} content={data.trainstCSTId.inoNm} />
                            <InfoBox title={'주소'} content={data.trainstCSTId.addr} />
                            <InfoContainer>
                                <InfoTitle>NCS 직무 분류</InfoTitle>
                                <InfoContentBlock>
                                    <InfoContent numberOfLines={2}>{data.ncsCd}</InfoContent>
                                    <InfoBlock onPress={() => setShowModal(true)}>
                                        <InfoIcon width={16} height={16} />
                                    </InfoBlock>
                                </InfoContentBlock>
                            </InfoContainer>
                            <InfoBox title={'훈련비용'} content={`${numberWithCommas(data.courseMan)} 원`} />

                            {/* <InfoBox title={'실제부담비용'} content={`${numberWithCommas(data.realMan)} 원`} /> */}
                            <InfoBox title={'실제부담비용'} content={data.realMan === data.courseMan ? '전액지원' : numberWithCommas(data.realMan) + ' 원'} />

                            <MiddleTitle>훈련과정 안내</MiddleTitle>
                            <InfoBox title={'선수학습'} content={data.trainPreCourse ? data.trainPreCourse : '해당없음'} />
                            <InfoBox title={'훈련목표'} content={data.trainGoal ? data.trainGoal : '해당없음'} />
                            <InfoBox title={'기취득자격'} content={data.trainPreQual ? data.trainPreQual : '해당없음'} />
                            <InfoBox title={'훈련대상자'} content={data.trainTarget ? data.trainTarget : '해당없음'} />
                            <ButtonContainer>
                                <StyledButton
                                    onPress={() => {
                                        Linking.openURL(data.url)
                                    }}
                                >
                                    <ButtonText>신청하기</ButtonText>
                                </StyledButton>
                            </ButtonContainer>
                        </ContentBlock>
                        {showModal && <ModalNCS ncsCd={data.ncsCd} onClick={() => setShowModal(false)} />}
                    </ModalInnerContainer>
                </ShadowStyle>
            </ModalContentContainer>
        </ModalContainer>
    )
}
