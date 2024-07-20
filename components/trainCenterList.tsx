import styled from 'styled-components/native'
import React, { useState } from 'react'
import { GestureResponderEvent, TouchableOpacity, Linking, ScrollView, Dimensions } from 'react-native'

import { trainCenter } from '@/type'
import TrainCenterDetailView from '@/components/trainCenterDetailView'

interface trainCourseProps {
    course: trainCenter
}

interface listProps {
    data: trainCenter[]
    scrollRef: React.RefObject<ScrollView>
}

const screen = Dimensions.get('screen')

const ScrollListView = styled.ScrollView`
    width: 100%;
`

const TrainCenterBlock = styled.TouchableOpacity`
    width: 100%;
    height: ${screen.height * 0.2}px;
    padding: 10px;
    background-color: #ffffff;
    flex-direction: row;
    border-top-color: #c6c6cf;
    border-top-width: 1px;
`

const ContentBlock = styled.View`
    width: 75%;
    padding: 5px;
`

const TitleText = styled.Text`
    margin-bottom: 40px;
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
    font-size: 16px;
    line-height: 35px;
    color: #626271;
    text-align: center;
    align-self: center;
`

function TrainCourse({ course }: trainCourseProps) {
    const gradeText = course.grade
        ? course.grade.startsWith('우수훈련기관')
            ? course.grade.replace('우수훈련기관 ', '우수훈련기관\n')
            : course.grade
        : '없음'
    const [showDetail, setShowDetail] = useState<boolean>(false)
    const onClick = async (event: GestureResponderEvent) => {
        event.preventDefault()
        await Linking.openURL(course.hpAddr)
    }
    // TODO: add link interactions (navigate detail view)
    return (
        <>
            <TrainCenterBlock onPress={() => setShowDetail(true)}>
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
            {showDetail && <TrainCenterDetailView id={course._id} onClose={() => setShowDetail(false)} />}
        </>
    )
}

// TODO: pagination 구현(무한 스크롤)
export function TrainCenterList({ data, scrollRef }: listProps) {
    return (
        <ScrollListView horizontal={false} ref={scrollRef}>
            {data.map(center => (
                <TrainCourse key={center._id} course={center} />
            ))}
        </ScrollListView>
    )
}
