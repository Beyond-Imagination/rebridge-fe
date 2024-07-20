import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { getTrainCourseSimpleView } from '@/api/trainCourse'
import { ISimpleTrainCourse } from '@/type'
import { useState } from 'react'
import TrainCourseDetailView from '@/components/TrainCourseDetailView'

interface Props {
    filter: string
    title: string
}

interface trainCourseProps {
    course: ISimpleTrainCourse
}

const screen = Dimensions.get('screen')

const MainView = styled.ScrollView`
    margin: 10px 0;
    padding: 10px 0;
`

const SubView = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    padding: 0 20px;
    gap: 10px;
`

const Loading = styled.ActivityIndicator`
    min-height: 200px;
    max-height: 200px;
`

const ViewBox = styled.View`
    background-color: #ffffff;
    border-radius: 12px;
    width: ${screen.width * 0.9}px;
    align-items: center;
    padding: 10px 0;
`

const ListView = styled.View`
    flex-direction: row;
    justify-content: space-around;
    width: 90%;
    padding: 10px 0 5px 0;
    border-bottom-color: #c6c6cf;
    border-bottom-width: 1px;
`

const ItemView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 90%;
    padding: 10px 0;
    margin: 5px 0;
    border-color: #c6c6cf;
    border-width: 1px;
    border-radius: 6px;
`

const Button = styled.TouchableOpacity`
    background-color: #ff6c3ecc;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    padding: 5px 0;
    width: 18%;
`

const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    width: 85%;
    padding: 10px 0;
`

const ListText = styled.Text`
    font-size: 12px;
    text-align: center;
    width: 20%;
`

const ItemText = styled.Text`
    font-size: 12px;
    text-align: left;
    width: 20%;
`

const ButtonText = styled.Text`
    color: #ffffff;
    font-size: 11px;
    text-align: center;
`

const NoneText = styled.Text`
    font-size: 15px;
    text-align: center;
    align-self: center;
    margin: 10px;
`

function TrainCourseSimple({ course }: trainCourseProps) {
    const [showDetail, setShowDetail] = useState(false)

    return (
        <>
            <ItemView key={course._id}>
                <ItemText numberOfLines={2} ellipsizeMode="tail">
                    {course.title}
                </ItemText>
                <ItemText numberOfLines={2} ellipsizeMode="tail">
                    {course.addr}
                </ItemText>
                <ItemText numberOfLines={1} ellipsizeMode="tail">
                    {course.trainStartDate}
                </ItemText>
                <Button onPress={() => setShowDetail(true)}>
                    <ButtonText>상세보기</ButtonText>
                </Button>
            </ItemView>
            {showDetail && <TrainCourseDetailView courseId={course._id} onClose={() => setShowDetail(false)} />}
        </>
    )
}

export function TrainCourseSimpleView({ filter, title }: Props) {
    const { data } = useQuery({
        queryKey: ['trainCourseSimpleList', filter],
        queryFn: () => getTrainCourseSimpleView(filter),
        enabled: !!filter,
        refetchOnWindowFocus: false,
    })

    if (!data) {
        return (
            <ViewBox>
                <Title>{title}</Title>
                <ListView>
                    <ListText>훈련과정</ListText>
                    <ListText>주소</ListText>
                    <ListText>시작일</ListText>
                    <ListText>상세보기</ListText>
                </ListView>
                <Loading />
            </ViewBox>
        )
    }

    return (
        <ViewBox>
            <Title>{title}</Title>
            <ListView>
                <ListText>훈련과정</ListText>
                <ListText>주소</ListText>
                <ListText>시작일</ListText>
                <ListText>상세보기</ListText>
            </ListView>
            {data.docsNm === 0 ? <NoneText>데이터 없음</NoneText> : data.docs.map(course => <TrainCourseSimple key={course._id} course={course} />)}
        </ViewBox>
    )
}

export function TrainCenterSimpleList() {
    return (
        <MainView horizontal={true} showsHorizontalScrollIndicator={false}>
            <SubView>
                <TrainCourseSimpleView filter={'마감'} title={'마감 직전 훈련과정'} />
                <TrainCourseSimpleView filter={'취업률'} title={'높은 취업률'} />
                <TrainCourseSimpleView filter={'전액지원'} title={'전액 지원'} />
            </SubView>
        </MainView>
    )
}
