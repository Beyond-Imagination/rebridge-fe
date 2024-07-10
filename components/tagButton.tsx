import styled from 'styled-components/native'

interface Props {
    text: string
    isClicked: boolean
    onClick: (text: string) => void
}

interface ListProps {
    clickedTags: string[]
    handleTagClick: (text: string) => void
}

interface StyledButtonProps {
    readonly isClicked: boolean
}

const StyledButton = styled.TouchableOpacity<StyledButtonProps>`
    padding: 5px;
    margin-right: 10px;
    align-items: center;
    color: #ffffff;
    background: #ffffff;
    border-radius: 5px;
    border-width: 1px;
    border-color: ${props => (props.isClicked ? '#626271' : '#C6C6CF')};
`

const StyledText = styled.Text`
    font-size: 15px;
    text-align: center;
`

const HorizontalScrollView = styled.ScrollView`
    max-height: 40px;
    min-height: 30px;
    margin: 2px;
`

const StyledView = styled.View`
    flex-direction: row;
    align-items: center;
`

export function TagButton({ text, isClicked, onClick }: Props) {
    return (
        <StyledButton isClicked={isClicked} onPress={() => onClick(text)} activeOpacity={1}>
            <StyledText>{`#${text}`}</StyledText>
        </StyledButton>
    )
}

// TODO: state가 전달될 수 있도록 prop 설정 필요
export function TagButtonList({ clickedTags, handleTagClick }: ListProps) {
    return (
        <HorizontalScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <StyledView>
                {tagList.map((value, index) => (
                    <TagButton key={value} text={value} isClicked={clickedTags.includes(value)} onClick={handleTagClick} />
                ))}
            </StyledView>
        </HorizontalScrollView>
    )
}

export const tagList = ['근로자직업능력개발훈련', '실업자계좌제', 'K-디지털 트레이닝', '국가기간전략산업직종훈련', '산업구조변화대응']
