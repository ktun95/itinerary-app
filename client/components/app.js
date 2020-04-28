import React from 'react' 
import { MapContainer } from './map'
import { Sidebar } from './sidebar'

export const App = () => {   
    return (
        <div className="with-sidebar">
            <Sidebar />
            <div className="content">
                <MapContainer />       
            </div>    
        </div>
    )

}