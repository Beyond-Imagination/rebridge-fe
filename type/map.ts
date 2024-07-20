export interface ICoordinate {
    longitude: number
    latitude: number
}

export interface IMarker {
    _id: string
    inoNm: string
    title?: string
    addr: string
    coordinates: ICoordinate
}

export interface ILocationObject {
    coords: ICoordinate
}
