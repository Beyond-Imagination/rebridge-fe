import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { Shadow } from 'react-native-shadow-2'

import { getNcsCodeDetail } from '@/api'

interface Props {
    ncsCd: string
    onClick: () => void
}

const screen = Dimensions.get('screen')

const ShadowStyle = styled(Shadow)`
    background-color: #ffffff;
    border-radius: 12px;
    border-color: #ffffff;
`

const Loading = styled.ActivityIndicator`
    min-height: 100px;
    max-height: 100px;
    align-self: center;
`

const MainView = styled.View`
    position: absolute;
    width: ${screen.width * 0.85}px;
    top: 50%;
    left: 50%;
    transform: translate(-${screen.width * 0.4}px, -${screen.height * 0.15}px);
`

const ContentBlock = styled.View`
    align-items: center;
    border-radius: 6px;
    width: ${screen.width * 0.85}px;
    padding: 20px;
`

const Title = styled.Text`
    font-size: 25px;
    text-align: center;
    margin-bottom: 16px;
    width: 100%;
`

const Info = styled.Text`
    font-size: 18px;
`

const CloseText = styled.Text`
    color: #90909f;
    font-size: 20px;
    text-align: center;
`

const CloseBlock = styled.TouchableOpacity`
    border-color: #c6c6cf;
    border-top-width: 1px;
    width: 100%;
    padding-top: 10px;
    margin-top: 16px;
`

export default function ModalNCS({ ncsCd, onClick }: Props) {
    const target = ncsCd.split('(')[0]

    const { data } = useQuery({
        queryKey: ['NCScdDetail', target],
        queryFn: () => getNcsCodeDetail(target),
        enabled: !!target,
        refetchOnWindowFocus: false,
    })

    if (!data) {
        return (
            <MainView>
                <ShadowStyle distance={7}>
                    <ContentBlock>
                        <Title>{target}</Title>
                        <Loading />
                        <CloseBlock onPress={onClick}>
                            <CloseText>닫기</CloseText>
                        </CloseBlock>
                    </ContentBlock>
                </ShadowStyle>
            </MainView>
        )
    }

    return (
        <MainView>
            <ShadowStyle distance={7}>
                <ContentBlock>
                    <Title>{data.ncsCdNm}</Title>
                    <Info>{data.ncsInfo}</Info>
                    <CloseBlock onPress={onClick}>
                        <CloseText>닫기</CloseText>
                    </CloseBlock>
                </ContentBlock>
            </ShadowStyle>
        </MainView>
    )
}
