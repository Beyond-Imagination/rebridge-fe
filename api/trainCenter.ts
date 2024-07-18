import { IGetTrainCenterDetailResponse } from '@/type'
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
