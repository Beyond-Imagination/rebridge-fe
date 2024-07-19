import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps";
import {StyleSheet, Text, View} from "react-native";
import {getNearByCenters} from "@/api";
import MapNotLoaded from "@/components/MapNotLoaded";
import {useQuery} from "@tanstack/react-query";
import {IMarkerResponse} from "@/app/(tabs)/Maps";

interface ICoordinates {
    latitude: number
    longitude: number
}
export interface IMapsProps {
    position: ICoordinates
}


const GoogleMaps = (props: IMapsProps) => {

    const {data, isLoading, isError} = useQuery({
        queryKey: [props.position.longitude, props.position.latitude],
        queryFn: () => getNearByCenters({latitude: props.position.latitude, longitude: props.position.longitude})
    })

    if (isLoading) {
        return <MapNotLoaded />
    }

    if (isError) {
        return <Text> Error :( </Text>
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                     initialRegion={{
                         latitude: props.position.latitude,
                         longitude: props.position.longitude,
                         latitudeDelta: 0.1,
                         longitudeDelta: 0.1,
                     }}
                     provider={PROVIDER_GOOGLE}
                     showsUserLocation={true}
                     followsUserLocation={true}
            >
                {data.map((marker: IMarkerResponse) => (
                    <Marker coordinate=
                                {{latitude: marker.coordinates.latitude, longitude: marker.coordinates.longitude}}
                            title={marker.inoNm}
                            description={marker.addr}
                    />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    }
})

export default GoogleMaps
