import styled from 'styled-components/native'
import { TrainCourseList } from './trainCourseList'
import { MapIcon } from '@/icon'
import { trainCourse } from '@/type'
import { useAuthorization } from '@/provider'
import { useQuery } from '@tanstack/react-query'
import { getRecommendTrainCourseList, getUserDetail } from '@/api'

const Container = styled.ScrollView`
    background-color: #ffffff;
`

const TitleText = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin: 10px;
`
const LoadingText = styled.Text`
    font-size: 18px;
    margin: 10px;
    text-align: center;
    margin-top: 150px;
`;

const SubtitleText = styled.Text`
    font-size: 16px;
    margin: 10px;
`

const HighlightText = styled.Text`
    color: #ff6c3ecc;
    font-weight: bold;
`

const ButtonContainer = styled.View`
    align-items: flex-end;
    margin: 0;
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

const ButtonText = styled.Text`
    margin-left: 5px;
`

export default function RecommendTrainCourseList() {

    const { jwt } = useAuthorization()

    const { data:userdata } = useQuery({
        queryKey: ['getUserDetail', jwt],
        queryFn: () => getUserDetail({ jwt }),
        enabled: !!jwt,
    })

    const userName = userdata?.user?.name ?? '';

    const { data, isLoading } = useQuery({
        queryKey: ['getRecommendTrainCourseList', jwt],
        queryFn: () => getRecommendTrainCourseList(jwt),
        enabled: !!jwt,
    })

    const recommendCourseList = data?.docs

    if(isLoading){
        return(

        <Container>
            <TitleText>
                <HighlightText>{userName}</HighlightText>님의 맞춤 훈련 과정
            </TitleText>
            <SubtitleText>사용자의 정보를 바탕으로 직업 훈련 기관을 추천해 드립니다</SubtitleText>
            <ButtonContainer>
                <StyledButton
                    onPress={() => {
                        // TODO: 정보입력 페이지로 이동
                        alert('훈련과정 추천(지도뷰) 페이지로 이동')
                    }}
                >
                    <MapIcon width={24} height={24} />
                    <ButtonText>지도보기</ButtonText>
                </StyledButton>
            </ButtonContainer>
            <LoadingText>{userName}님을 위한 맞춤 직업 훈련 기관을 {"\n"} 검색 중입니다...🌀</LoadingText>
        </Container>
        )
    }

    return (
        <Container>
            <TitleText>
                <HighlightText>{userName}</HighlightText>님의 맞춤 훈련 과정
            </TitleText>
            <SubtitleText>사용자의 정보를 바탕으로 직업 훈련 기관을 추천해 드립니다</SubtitleText>
            <ButtonContainer>
                <StyledButton
                    onPress={() => {
                        // TODO: 정보입력 페이지로 이동
                        alert('훈련과정 추천(지도뷰) 페이지로 이동')
                    }}
                >
                    <MapIcon width={24} height={24} />
                    <ButtonText>지도보기</ButtonText>
                </StyledButton>
            </ButtonContainer>
            <TrainCourseList data={recommendCourseList} size={18} />
        </Container>
    )
}
