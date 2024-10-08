import { ICoordinate } from '@/type/map'

export interface trainCourse {
    _id: string
    title: string
    inoNm: string
    elEmplRate: number
    addr: string
    trainStartDate: string
    trainEndDate: string
    trainTime: string
    recommendScore: number
    coordinates: ICoordinate
}

export interface ISimpleTrainCourse {
    _id: string
    title: string
    addr: string
    elEmplRate: number
    trainStartDate: string
    trainEndDate: string
}

export interface IGetSimpleTrainCourseResponse {
    docs: ISimpleTrainCourse[]
    docsNm: number
}

export interface IGetTrainCourseDetailResponse {
    title: string
    trainstCSTId: {
        inoNm: string
        addr: string
    }
    ncsCd: string
    trainTime: string
    courseMan: number
    realMan: number
    trainPreCourse: string
    trainGoal: string
    trainPreQual: string
    trainTarget: string
    url: string
}

export interface IGetRecommendTrainCourseListResponse {
    docs: trainCourse[]
}
