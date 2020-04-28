import React, { useEffect } from 'react' 

export const MapContainer = () => {   

    useEffect(() => {
        let  map = L.map('mapid', {
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
        }).addTo(map);
        
        map.on('dblclick', (e) => L.marker(e.latlng).addTo(map))
    })
    
    return(
        <div id="mapid">
        </div>
    )
}