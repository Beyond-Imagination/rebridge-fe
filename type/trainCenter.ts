import { trainCourse } from '@/type/trainCourse'
import { ICoordinate } from '@/type/map'

export interface trainCenter {
    _id: string
    inoNm: string
    grade: string
    telNo: string
    faxNo: string
    zipCd: string
    addr: string
    hpAddr: string
    email: string
    coordinates: ICoordinate
}

export interface IGetTrainCenterDetailResponse {
    trainCenter: trainCenter
    trainCourses: trainCourse[]
}

export interface SearchTarget {
    searchText: string
    tagList: string[]
    createdAt: string
}

export interface ISearchTrainCenterRequest extends SearchTarget {}
