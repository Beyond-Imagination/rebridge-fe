import { ICategorySummaryResponse, IRegionDetailResponse, IRegionSummaryResponse } from '@/type/trainStatistic'
import { SERVER_URL } from '@/config'

export async function getRegionSummary(year: number): Promise<IRegionSummaryResponse> {
    const res = await fetch(`${SERVER_URL}/train/statistic/region-summary?year=${year}`, {
        method: 'GET',
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}

export async function getCategorySummary(year: number): Promise<ICategorySummaryResponse> {
    const res = await fetch(`${SERVER_URL}/train/statistic/category-summary?year=${year}`, {
        method: 'GET',
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}

export async function getRegionDetail(region: string, year: number): Promise<IRegionDetailResponse> {
    const searchParams = new URLSearchParams({
        region: region,
        year: year.toString(),
    })
    const res = await fetch(`${SERVER_URL}/train/statistic/region-detail?${searchParams}`, {
        method: 'GET',
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}
