import { IGetTrainCenterDetailResponse, IMarkerResponse, ISearchTrainCenterRequest, trainCenter } from '@/type'
import { SERVER_URL } from '@/config'

export async function getTrainCenterDetail(id: string): Promise<IGetTrainCenterDetailResponse> {
    const res = await fetch(`${SERVER_URL}/train/center?id=${id}`, {
        method: 'GET',
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}

export async function searchTrainCenter(request: ISearchTrainCenterRequest): Promise<trainCenter[]> {
    const res = await fetch(`${SERVER_URL}/train/center/search?value=${request.searchText}`, {
        method: 'GET',
    })
    if (res.status === 404) {
        return []
    } else if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}
export async function getNearByCenters(position: { latitude: number; longitude: number }): Promise<IMarkerResponse[]> {
    const res = await fetch(`${SERVER_URL}/train/center/nearby?size=100`, {
        method: 'GET',
        headers: {
            longitude: position.longitude,
            latitude: position.latitude,
        },
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}
