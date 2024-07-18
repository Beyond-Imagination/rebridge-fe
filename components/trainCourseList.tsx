import styled from 'styled-components/native'

import { trainCourse } from '@/type'
import TrainCourseDetailView from './TrainCourseDetailView'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

interface trainCourseProps {
    course: trainCourse
}

interface listProps {
    data: trainCourse[]
}

const ScrollListView = styled.ScrollView`
    width: 100%;
`

const TrainCourseBlock = styled(TouchableOpacity)`
    width: 100%;
    padding: 15px;
    background-color: #ffffff;
    align-items: center;
    flex-direction: row;
    border-top-color: #c6c6cf;
    border-top-width: 1px;
`

const ContentBlock = styled.View`
    width: 75%;
    padding: 5px;
`

const TitleText = styled.Text`
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
`

const ContentText = styled.Text`
    margin-bottom: 5px;
    font-size: 15px;
    color: #626271;
`

const EmplRateBlock = styled.View`
    width: 25%;
    flex-direction: column;
`

const StyledText = styled.Text`
    margin-bottom: 10px;
    font-size: 15px;
    color: #626271;
    text-align: center;
`

const EmplRate = styled.Text`
    font-size: 20px;
    color: #626271;
    text-align: center;
`

function TrainCourse({ course }: trainCourseProps) {
    // TODO: add link interactions (navigate detail view and move map position)

    const [showDetail , setShowDetail] = useState(false)

    return (
        <>
        <TrainCourseBlock 
            onPress={() => {
            setShowDetail(true);
        }}
        >
            <ContentBlock>
                <TitleText>{course.title}</TitleText>
                <ContentText>{course.trainCenter}</ContentText>
                <ContentText>{`${course.trainStartDate}~${course.trainEndDate}(${course.trainTime})`}</ContentText>
                <ContentText>{course.address}</ContentText>
            </ContentBlock>
            <EmplRateBlock>
                <StyledText>취업률</StyledText>
                <EmplRate>{course.elEmplRate ? `${course.elEmplRate}%` : '데이터 없음'}</EmplRate>
            </EmplRateBlock>
        </TrainCourseBlock>
        {showDetail  && <TrainCourseDetailView courseId={course._id} onClose={() => setShowDetail(false)} />}
        </>
    )
}

// TODO: pagination 구현(무한 스크롤)
export function TrainCourseList({ data }: listProps) {
    return (
        <ScrollListView horizontal={false}>
            {data.map(course => (
                <TrainCourse key={course._id} course={course} />
            ))}
        </ScrollListView>
    )
}
