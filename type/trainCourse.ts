export interface trainCourse {
    _id: string
    title: string
    trainCenter: string
    elEmplRate: number
    address: string
    trainStartDate: string
    trainEndDate: string
    trainTime: string
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
