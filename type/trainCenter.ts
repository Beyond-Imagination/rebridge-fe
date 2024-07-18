import { trainCourse } from '@/type/trainCourse'

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
}

export interface IGetTrainCenterDetailResponse {
    trainCenter: trainCenter
    trainCourses: trainCourse[]
}
