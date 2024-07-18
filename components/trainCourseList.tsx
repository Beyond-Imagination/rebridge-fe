import styled from 'styled-components/native'
import { View } from 'react-native'

import { trainCourse } from '@/type'
import TrainCourseDetailView from './TrainCourseDetailView'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

interface trainCourseProps {
    course: trainCourse
    size: number
}

interface listProps {
    data: trainCourse[]
    size: number
}

interface fontProps {
    size: number
}

const TrainCourseBlock = styled(TouchableOpacity)`
    width: 100%;
    padding: 15px;
    background-color: #ffffff;
    border-color: #c6c6cf;
    border-width: 1px;
`

const ContentBlock = styled.View`
    flex-direction: row;
    align-items: center;
`

const Content = styled.View`
    width: 75%;
    padding: 5px;
`

const TitleText = styled.Text<fontProps>`
    margin-bottom: 10px;
    font-size: ${props => `${props.size}px`};
    font-weight: bold;
`

const ContentText = styled.Text<fontProps>`
    margin-bottom: 5px;
    font-size: ${props => `${props.size}px`};
    color: #626271;
`

const EmplRateBlock = styled.View`
    width: 25%;
    flex-direction: column;
`

const StyledText = styled.Text<fontProps>`
    margin-bottom: 10px;
    font-size: ${props => `${props.size}px`};
    color: #626271;
    text-align: center;
`

const EmplRate = styled.Text<fontProps>`
    font-size: ${props => `${props.size}px`};
    color: #626271;
    text-align: center;
`

function TrainCourse({ course, size }: trainCourseProps) {
    // TODO: add link interactions (navigate detail view and move map position)

    const [showDetail, setShowDetail] = useState(false)

    return (
        <>
            <TrainCourseBlock
                onPress={() => {
                    setShowDetail(true)
                }}
            >
                <TitleText size={size}>{course.title}</TitleText>
                <ContentBlock>
                    <Content>
                        <ContentText size={size * 0.8}>{course.inoNm}</ContentText>
                        <ContentText size={size * 0.8}>{`${course.trainStartDate}~${course.trainEndDate}(${course.trainTime})`}</ContentText>
                        <ContentText size={size * 0.8}>{course.addr}</ContentText>
                    </Content>
                    <EmplRateBlock>
                        <StyledText size={size * 0.8}>취업률</StyledText>
                        <EmplRate size={size * 1.2}>{course.elEmplRate ? `${course.elEmplRate}%` : '데이터 없음'}</EmplRate>
                    </EmplRateBlock>
                </ContentBlock>
            </TrainCourseBlock>
            {showDetail && <TrainCourseDetailView courseId={course._id} onClose={() => setShowDetail(false)} />}
        </>
    )
}

// TODO: pagination 구현(무한 스크롤)
export function TrainCourseList({ data, size }: listProps) {
    return (
        <View>
            {data.map(course => (
                <TrainCourse key={course._id} course={course} size={size} />
            ))}
        </View>
    )
}
