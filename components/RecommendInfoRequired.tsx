import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
    background-color: #FFFFFF;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const MessageText = styled.Text`
    text-align: center;
`;

const StyledButton = styled.TouchableOpacity`
    background-color: #FF6C3ECC;
    border-radius: 7px;
    width: 120px;
    height: 29px;
    margin-top: 40px;
    align-items: center;
    justify-content: center;
`;

const ButtonText = styled.Text`
    color: #FFFFFF;
    font-size: 12px;
    text-align-vertical: center;
`;

export default function RecommendInfoRequired() {
    return (
        <Container>
            <MessageText>
                훈련과정 추천 서비스를 이용하기 위해서는{"\n"}추가적인 정보가 필요합니다.
            </MessageText>
            <StyledButton
                onPress={() => {
                    // TODO: 정보입력 페이지로 이동
                    alert('정보입력 페이지로 이동');
                }}
            >
                <ButtonText>
                    정보 입력 하러가기
                </ButtonText>
            </StyledButton>
        </Container>
    );
}
