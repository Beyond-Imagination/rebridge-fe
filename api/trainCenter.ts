import { IGetTrainCenterDetailResponse } from '@/type'
import { SERVER_URL } from '@/config'
import {IMarkerResponse} from "@/app/(tabs)/myInfo";

export async function getTrainCenterDetail(id: string): Promise<IGetTrainCenterDetailResponse> {
    const res = await fetch(`${SERVER_URL}/train/center?id=${id}`, {
        method: 'GET',
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}

export async function getNearByCenters(position: {latitude: number, longitude: number}): Promise<IMarkerResponse[]> {
    const res = await fetch(`${SERVER_URL}/train/center/nearby?size=100`, {
        method: 'GET',
        headers: {
            longitude: position.longitude,
            latitude: position.latitude,
        }
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}
