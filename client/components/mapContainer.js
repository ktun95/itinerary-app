import React, { useState,  useEffect } from 'react' ;
import { connect } from 'react-redux';
import { addActivity, addMap, addLayer } from '../store'

export const MapContainer = (props) => {
    // const [map, setMap] = useState(null) 
    const { map } = props;
    const [layers, setLayers] = useState({
        activities: {},
        businesses: {}
    })
    const [markers, setMarkers] = useState([]);
    const initialViewLocation = props.viewLocation || [32.716, -117.161];    

    const addMarkerToLayerGroup = (activity, layerGroup) => {
        let { latitude, longitude } = activity.coordinates
        let iconUrl = (activity.id === props.selected ? 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png' : 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png')
        let icon = L.icon({
            iconUrl,
            iconSize: (activity.id === props.selected ? [50, 82] : [25, 41]),
            iconAnchor: (activity.id === props.selected ? [25, 82] : [12.5, 41]),
            shadowUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png',
        })
        
        let marker = L.marker([latitude, longitude], {icon})
        
        marker.addTo(layerGroup)
        console.log('adding single marker to layer group')
        
        marker.id = activity.id
        
        marker.on('click', (e) => {
            props.handleClickSelect(e.target.id)
        })
        marker.on('dblclick', (e) => {        
            map.panTo([latitude, longitude])
        })

        setMarkers( m => m.concat(marker))
    }

    useEffect(() => { //Renders map after first render;
    const checkMapStateAndElementRendered = (document.getElementById('mapid') && Object.keys(map).length === 0)
        if (checkMapStateAndElementRendered) {
            console.log('initializing map...')
        // INITIALIZE MAP            
            const myMap = L.map('mapid', {
                doubleClickZoom: false
                }).setView(initialViewLocation, 13);
           
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                interactive: true,
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1Ijoia3Z0dW4iLCJhIjoiY2pvZzgxNXNqMGNkaTN3cWgxajR0bzUzNiJ9.zj2dMLc3dXbt0L0gvP_mXA'
            }).addTo(myMap);

            
            // myMap.on('dblclick', (e) => L.marker(e.latlng).addTo(myMap))
        //INITIALIZE GGGGGLAYER GROUPS
            const activityLayer = L.layerGroup().addTo(myMap)
            const businessLayer = L.layerGroup().addTo(myMap)
    
        //ADD MAP OBJECTS TO STATE
            // setMap(myMap)
            setLayers({
                activities: activityLayer,
                businesses: businessLayer
            })
            props.addMap(myMap)
            props.addLayer({activities: activityLayer})
            props.addLayer({businesses: businessLayer})
        }
    }, [])
    
    useEffect(() => { // Populate map with markers of activities
        console.log('populating map with markers', map, props.layers)
        markers.forEach(marker => marker.remove()) // Removes markers drawn by previous render; marker state holds marker objects that were created and drawn from the previous render, using props.activities
        if (map && Object.keys(map).length) {
            if (props.activities.length) {
                console.log('adding activities to activity layer')
                props.activities.map((activity) => {
                    addMarkerToLayerGroup(activity, props.layers.activities)
                })}
                
                if (props.businesses.length) {
                    console.log('adding businesses to business layer')
                    props.businesses.map((business) => {
                    addMarkerToLayerGroup(business, props.layers.businesses)
            })}
            
        }

    }, [props.activities, props.selected, props.businesses, props.layers, map])

    // useEffect(() => {
    //     console.log(props.businesses)
    //     props.businesses.forEach((business) => {
    //         L.marker([business.coordinates.latitude, business.coordinates.longitude]).addTo(map)
    //     })
    // }, [props.businesses])


    return(
        <div id="mapid">
        </div>
    )
}

const mapStateToProps = ({mapReducer}) => ({
    map: mapReducer.map,
    layers: mapReducer.layers
})

const mapDispatchToProps = dispatch => ({
    addMap: (map) => dispatch(addMap(map)),
    addLayer: (layer) => dispatch(addLayer(layer)),
    addActivity: (activity) => dispatch(addActivity(activity))
})

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)