export interface ITrainStatistic {
    trainCenterNm: number
    trainCourseNm: number
    trainCourseRoundNm: number
}

export interface IRegionSummary extends ITrainStatistic {
    region: string
}

export interface ICategorySummary extends ITrainStatistic {
    category: string
}

export interface IRegionSummaryResponse {
    docs: IRegionSummary[]
    totalDocs: number
}

export interface ICategorySummaryResponse {
    docs: ICategorySummary[]
    totalDocs: number
}

export interface IRegionDetailResponse extends ICategorySummaryResponse {}

export interface INcsCodeDetailResponse {
    ncsCdNm: string
    ncsInfo: string
}
