import styled from 'styled-components/native'
import { TrainCourseList } from './trainCourseList'
import { MapIcon } from '@/icon'

const Container = styled.View`
    background-color: #ffffff;
`

const TitleText = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin: 10px;
`

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
    const userName = '####'
    const field = '####'
    const trainCourse = Array.from({ length: 10 }, (_, index) => ({
        _id: {
            $oid: `6690f9ac8c73aaa85b61a21a${index}`,
        },
        title: '[혼합]『HTML5&CSS3』UI/UX웹퍼블리셔 프론트엔드(웹표준,반응형)',
        trainCenter: '서울지방협회',
        elEmplRate: '83.3',
        trainTime: '10일, 총56시간',
        trainStartDate: '2024-06-05',
        trainEndDate: '2024-07-08',
        address: '서울특별시 동대문구 홍릉로 28 (청량리동 성일빌딩) 4층',
    }))

    return (
        <Container>
            <TitleText>
                <HighlightText>{userName}</HighlightText>님의 맞춤 훈련 과정
            </TitleText>
            <SubtitleText>{field}분야의 직업 훈련 기관을 추천해드립니다.</SubtitleText>
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
            <TrainCourseList data={trainCourse} />
        </Container>
    )
}
