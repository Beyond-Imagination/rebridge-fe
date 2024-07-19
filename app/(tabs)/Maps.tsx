import {useEffect, useState} from "react";
import * as Location from "expo-location";
import GoogleMaps from "@/components/GoogleMaps";
import MapNotLoaded from "@/components/MapNotLoaded";

interface ILocationObject {
    coords: {
        latitude: number,
        longitude: number,
    }
}

export interface IMarkerResponse {
    _id: string,
    inoNm: string,
    addr: string,
    coordinates: {
        longitude: number,
        latitude: number,
    },
}

const Maps = () => {
    const [location, setLocation] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    // 컴포넌트가 마운트 될 때, 마커 위치를 로드합니다.
    useEffect(() => {
        ;(async () => {
            const {status} = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                console.warn('location permission denied')
                return
            }
            const initPosition: ILocationObject = await Location.getCurrentPositionAsync()
            setLocation(initPosition)
            setIsLoaded(true)
        })()
    }, [])

    return (
        isLoaded ?
            <GoogleMaps position={{latitude: Number(location.coords.latitude), longitude: Number(location.coords.longitude)}}/>
            : <MapNotLoaded description={'Google Maps Not Loaded'}/>
    )
}

export default Maps
