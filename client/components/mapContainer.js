import React, { useState,  useEffect } from 'react' 

export const MapContainer = (props) => {
    const [map, setMap] = useState({}) 
    const [markers, setMarkers] = useState([])
    
        useEffect(() => {
        if (document.getElementById('mapid') && Object.keys(map).length === 0) {
            console.log('initializing map...')
            const myMap = L.map('mapid', {
                doubleClickZoom: false
                }).setView([32.716, -117.161], 13);
           
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                interactive: true,
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1Ijoia3Z0dW4iLCJhIjoiY2pvZzgxNXNqMGNkaTN3cWgxajR0bzUzNiJ9.zj2dMLc3dXbt0L0gvP_mXA'
            }).addTo(myMap);
            
            myMap.on('click', (e) => console.log(e.latlng))
            myMap.on('dblclick', (e) => L.marker(e.latlng).addTo(myMap))
            setMap(myMap)
        }
    }, [])

    useEffect(() => { // Populate map with markers of activities
        markers.forEach(marker => marker.remove()) // Removes markers drawn by previous render; marker state holds marker objects that were created and drawn from the previous render, using props.activities
        
        props.activities.map(activity => {
            console.log(props.selected)
            let iconUrl = (activity.id === props.selected ? 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png' : 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png')
            let icon = L.icon({
                iconUrl,
                iconSize: (activity.id === props.selected ? [50, 82] : [25, 41]),
                iconAnchor: (activity.id === props.selected ? [25, 82] : [12.5, 41]),
                shadowUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png',
            })

            let marker = L.marker(activity.location, {icon}).addTo(map)
            
            marker.id = activity.id
            
            marker.on('click', (e) => {
    
                props.handleClickSelect(e.target.id)
                
                //
                map.panTo(activity.location)
                //
            })

            setMarkers( m => m.concat(marker))
        })
        
        return (() => {
            // markers.forEach(marker => {
                // console.dir(marker.removeFrom(map))
                // marker.removeFrom(map)})
                // console.log(marker.id)
        })

    }, [props.activities, props.selected])

    return(
        <div id="mapid">
        </div>
    )
}