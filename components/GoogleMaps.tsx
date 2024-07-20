import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { StyleSheet, View } from 'react-native'

import { ILocationObject, IMarker } from '@/type'
import MapNotLoaded from '@/components/MapNotLoaded'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location'

export interface IMapsProps {
    marker: IMarker[]
    onMarkPress: (markerIndex: number) => void
}

const GoogleMaps = ({ marker, onMarkPress }: IMapsProps) => {
    const [location, setLocation] = useState<ILocationObject | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        ;(async () => {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                console.warn('location permission denied')
                return
            }
            const initPosition: ILocationObject = await Location.getCurrentPositionAsync()
            setLocation(initPosition)
            setIsLoaded(true)
        })()
    }, [])

    if (!isLoaded) {
        return <MapNotLoaded description={'Google Maps Not Loaded'} />
    } else {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: Number(location?.coords.latitude),
                        longitude: Number(location?.coords.latitude),
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    provider={PROVIDER_GOOGLE}
                    mapType={'standard'}
                    showsUserLocation={true}
                    followsUserLocation={true}
                >
                    {marker.length !== 0 &&
                        marker.map((m, i) => (
                            <Marker
                                key={m._id}
                                coordinate={{ latitude: m.coordinates.latitude, longitude: m.coordinates.longitude }}
                                title={m.title ? m.title : m.inoNm}
                                description={m.addr}
                                onPress={() => onMarkPress(i)}
                            />
                        ))}
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
})

export default GoogleMaps
