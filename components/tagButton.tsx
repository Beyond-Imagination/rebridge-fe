import { useState } from 'react'
import styled from 'styled-components/native'

interface Props {
    text: string
    initState: boolean
}

interface StyledButtonProps {
    readonly clicked: boolean
}

const StyledButton = styled.TouchableOpacity<StyledButtonProps>`
    padding: 5px;
    margin-left: 5px;
    margin-right: 5px;
    height: 25px;
    align-items: center;
    color: #ffffff;
    background: #ffffff;
    border-radius: 5px;
    border-width: 1px;
    border-color: ${props => (props.clicked ? '#626271' : '#C6C6CF')};
`

const StyledText = styled.Text`
    font-size: 15px;
    text-align: center;
`

// TODO: change width property
const HorizontalScrollView = styled.ScrollView`
    width: 75%;
    max-height: 30px;
    margin: 2px;
`

const StyledView = styled.View`
    flex-direction: row;
    align-items: center;
`

export function TagButton({ text, initState }: Props) {
    const [clicked, setClick] = useState<boolean>(initState)
    return (
        <StyledButton clicked={clicked} onPress={() => setClick(!clicked)} activeOpacity={1}>
            <StyledText>{`#${text}`}</StyledText>
        </StyledButton>
    )
}

// TODO: state가 전달될 수 있도록 prop 설정 필요
export function TagButtonList() {
    return (
        <HorizontalScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <StyledView>
                <TagButton text={'근로자직업능력개발훈련'} initState={false} />
                <TagButton text={'실업자계좌제'} initState={false} />
                <TagButton text={'K-디지털 트레이닝'} initState={false} />
                <TagButton text={'국가기간전략산업직종훈련'} initState={false} />
                <TagButton text={'산업구조변화대응'} initState={false} />
            </StyledView>
        </HorizontalScrollView>
    )
}
