import React, { useState } from 'react';
import { TouchableOpacity, Modal, Text, View, Linking, Alert } from 'react-native';
import styled from 'styled-components/native';
import { getTrainCourseDetail } from '@/api/trainCourse';
import { CrossButton, InfoIcon } from '@/icon';
import { useQuery } from '@tanstack/react-query';
import { getNcsCodeDetail } from '@/api';

interface Props {
    courseId: string;
    onClose:() => void;
}

const ModalContainer = styled.Modal``;

const ModalContentContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const ModalInnerContainer = styled.View`
    width: 80%;
    height: 80%;
    background-color: white;
    border-radius: 10px;
    border-width: 1px;
    border-color: gray;
    padding: 20px;
`;

const CloseButtonContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: flex-end;
    padding: 20px;
`;

const ModalTitle = styled.Text`
    font-size: 26px;
    margin-bottom: 10px;
`;

const MiddleTitle = styled.Text`
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const ModalTextContainer = styled.View`
    flex-direction: row;
    margin-bottom: 5px;
`;

const LabelText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    width: 100px; 
    margin: 5px;
`;

const ValueText = styled.Text`
    font-size: 12px;
    margin: 5px;
    flex: 1; 
`;

const ButtonContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const StyledButton = styled.TouchableOpacity`
    background-color: #ff6c3ecc;
    border-radius: 7px;
    width: 120px;
    height: 29px;
    margin-top: 40px;
    align-items: center;
    justify-content: center;
`;

const ButtonText = styled.Text`
    color: #ffffff;
    font-size: 12px;
    text-align-vertical: center;
`;

export default function TrainCourseDetailView ({ courseId, onClose }: Props) {

    function numberWithCommas(number: number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const { data, isLoading } = useQuery({
        queryKey: ['trainCourseDetail', courseId],
        queryFn: () => getTrainCourseDetail(courseId),
        enabled: !!courseId,
        refetchOnWindowFocus: false,
    });

    const target = data.ncsCd.split('(')[0];

    const { data:ncsDetail } = useQuery({
        queryKey: [target],
        queryFn: () => getNcsCodeDetail(target),
        enabled: !!courseId,
        refetchOnWindowFocus: false,
    });
    

    if (isLoading) {
        return (
            <ModalContainer visible={true} animationType="slide">
                <ModalContentContainer>
                    <ModalInnerContainer>
                        <CloseButtonContainer onPress={onClose}>
                            <CrossButton width={30} height={30} />
                        </CloseButtonContainer>
                        <Text style={{ textAlign: 'center' }}>Loading...</Text>
                    </ModalInnerContainer>
                </ModalContentContainer>
            </ModalContainer>
        );
    }

    if (!data) {
        return (
            <ModalContainer visible={true} animationType="slide">
                <ModalContentContainer>
                    <ModalInnerContainer>
                        <CloseButtonContainer onPress={onClose}>
                            <CrossButton width={30} height={30} />
                        </CloseButtonContainer>
                        <Text style={{ textAlign: 'center' }}>잘못된 접근입니다.</Text>
                    </ModalInnerContainer>
                </ModalContentContainer>
            </ModalContainer>
        );
    }
    //url

    return (
        <ModalContainer visible={true} animationType="slide">
            <ModalContentContainer>
                <ModalInnerContainer>
                    <CloseButtonContainer onPress={onClose}>
                        <CrossButton width={30} height={30} />
                    </CloseButtonContainer>
                    <ModalTitle>{data.title}</ModalTitle>

                    <ModalTextContainer>
                        <LabelText>훈련기관명</LabelText>
                        <ValueText>{data.trainstCSTId.inoNm}</ValueText>
                    </ModalTextContainer>

                    <ModalTextContainer>
                        <LabelText>주소</LabelText>
                        <ValueText>{data.trainstCSTId.addr}</ValueText>
                    </ModalTextContainer>

                    <ModalTextContainer>
                        <LabelText>NCS 직무 분류</LabelText> 
                        <TouchableOpacity
                             onPress={() => 
                                Alert.alert(
                                    ncsDetail?.ncsCdNm,
                                    ncsDetail?.ncsInfo,
                                    [
                                      { text: '닫기' },
                                    ],
                                    { cancelable: false }
                                  )
                             }
                        >
                        <ValueText>
                            {data.ncsCd.split('(')[0]}
                            <InfoIcon width={10} height={10} />
                        </ValueText>
                        </TouchableOpacity>

                    </ModalTextContainer>

                    <ModalTextContainer>
                        <LabelText>훈련시간</LabelText>
                        <ValueText>{data.trainTime}</ValueText>
                    </ModalTextContainer>

                    <ModalTextContainer>
                        <LabelText>훈련비용</LabelText>
                        <ValueText>{numberWithCommas(data.courseMan)} 원</ValueText>
                    </ModalTextContainer>

                    <ModalTextContainer>
                        <LabelText>실제부담비용</LabelText>
                        <ValueText>{data.realMan === data.courseMan ? "전액지원" : numberWithCommas(data.realMan)+" 원"}</ValueText>
                    </ModalTextContainer>

                    <MiddleTitle>훈련과정 안내</MiddleTitle>

                    <ModalTextContainer>
                        <LabelText>선수학습</LabelText>
                        <ValueText>{data.trainPreCourse == null ? "해당없음" : data.trainPreCourse}</ValueText>
                    </ModalTextContainer>

                    <ModalTextContainer>
                        <LabelText>훈련목표</LabelText>
                        <ValueText>{data.trainGoal}</ValueText>
                    </ModalTextContainer>

                    <ModalTextContainer>
                        <LabelText>기취득자격</LabelText>
                        <ValueText>{data.trainPreQual == null ? "해당없음" : data.trainPreQual}</ValueText>
                    </ModalTextContainer>

                    <ModalTextContainer>
                        <LabelText>훈련대상자</LabelText>
                        <ValueText>{data.trainTarget == null ? "상관없음" : data.trainTarget}</ValueText>
                    </ModalTextContainer>

                    <ButtonContainer>
                        <StyledButton
                            onPress={() => {
                                Linking.openURL(data.url);
                            }}
                        >
                            <ButtonText>신청하기</ButtonText>
                        </StyledButton>
                    </ButtonContainer>
                </ModalInnerContainer>
            </ModalContentContainer>
        </ModalContainer>
    );
};
