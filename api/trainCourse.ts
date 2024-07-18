import { SERVER_URL } from '@/config'
import { IGetSimpleTrainCourseResponse, IGetTrainCourseDetailResponse } from '@/type'

export async function getTrainCourseSimpleView(filter: string): Promise<IGetSimpleTrainCourseResponse> {
    const res = await fetch(`${SERVER_URL}/train/course/simpleList?filter=${filter}`, {
        method: 'GET',
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}
export async function getTrainCourseDetail(courseId: string): Promise<IGetTrainCourseDetailResponse> {
    const res = await fetch(`${SERVER_URL}/train/course?id=${courseId}`, {
        method: 'GET',
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}
