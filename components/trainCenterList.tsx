import styled from 'styled-components/native'
import { GestureResponderEvent, TouchableOpacity } from 'react-native'
import { Linking } from 'react-native'

import { trainCenter } from '@/type'

interface trainCourseProps {
    course: trainCenter
}

interface listProps {
    data: trainCenter[]
}

const ScrollListView = styled.ScrollView`
    width: 100%;
`

const TrainCenterBlock = styled.View`
    width: 100%;
    padding: 10px;
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

const GradeText = styled.Text`
    width: 25%;
    flex-direction: column;
    font-size: 18px;
    line-height: 35px;
    color: #626271;
    text-align: center;
`

function TrainCourse({ course }: trainCourseProps) {
    const gradeText = course.grade.startsWith('우수훈련기관') ? course.grade.replace('우수훈련기관 ', '우수훈련기관\n') : course.grade
    const onClick = async (event: GestureResponderEvent) => {
        event.preventDefault()
        await Linking.openURL(course.hpAddr)
    }
    // TODO: add link interactions (navigate detail view)
    return (
        <TrainCenterBlock>
            <ContentBlock>
                <TitleText>{course.inoNm}</TitleText>
                <ContentText>{course.telNo}</ContentText>
                <ContentText>{course.addr}</ContentText>
                <TouchableOpacity onPress={onClick}>
                    <ContentText>{course.hpAddr}</ContentText>
                </TouchableOpacity>
            </ContentBlock>
            <GradeText>{gradeText}</GradeText>
        </TrainCenterBlock>
    )
}

// TODO: pagination 구현(무한 스크롤)
export function TrainCenterList({ data }: listProps) {
    return (
        <ScrollListView horizontal={false}>
            {data.map(center => (
                <TrainCourse key={center._id} course={center} />
            ))}
        </ScrollListView>
    )
}
