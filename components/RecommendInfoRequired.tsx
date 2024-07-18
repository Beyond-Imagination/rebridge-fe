import React from 'react'
import styled from 'styled-components/native'
import { useAuthorization } from '@/provider'
import { CommonActions, useNavigation } from '@react-navigation/native'

const Container = styled.View`
    background-color: #ffffff;
    flex: 1;
    justify-content: center;
    align-items: center;
`

const MessageText = styled.Text`
    text-align: center;
`

const StyledButton = styled.TouchableOpacity`
    background-color: #ff6c3ecc;
    border-radius: 7px;
    width: 120px;
    height: 29px;
    margin-top: 40px;
    align-items: center;
    justify-content: center;
`

const ButtonText = styled.Text`
    color: #ffffff;
    font-size: 12px;
    text-align-vertical: center;
`

export default function RecommendInfoRequired() {
    const auth = useAuthorization()
    const navigator = useNavigation()
    const onPress = () => {
        if (!auth.jwt) {
            navigator.dispatch(CommonActions.navigate({ name: 'user/signIn' }))
        } else {
            navigator.dispatch(CommonActions.navigate({ name: 'myInfo' }))
        }
    }
    return (
        <Container>
            <MessageText>훈련과정 추천 서비스를 이용하기 위해서는{'\n'}추가적인 정보가 필요합니다.</MessageText>
            <StyledButton onPress={onPress}>
                <ButtonText>정보 입력 하러가기</ButtonText>
            </StyledButton>
        </Container>
    )
}
