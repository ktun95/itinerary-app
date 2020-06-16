import React, { useState, useEffect } from 'react' 
import { MapContainer, Sidebar } from '../components'

export const Map = () => {

    let dummyData = [
        {
            id: 1,
            title: 'Tacos el Gordo',
            description: 'The Tacos here are really good, eat this yum yum yum yum',
            location: [32.6290706, -117.0912042]
        },
        {
            id: 2,
            title: 'Timken Museum of Art',
            description: 'Watch the best anime from the 90s',
            location: [32.73188602289799, -117.14963050421301]
        },
        {
            id: 3,
            title: 'Crack House',
            description: 'Really good hot chicken sandwiches here!',
            location: [32.727, -117.173]
        },
        {
            id: 4,
            title: 'Sunset Cliffs',
            description: 'Beautiful views. Good seagulls',
            location: [32.7273047, -117.2597412]
        },
        {
            id: 5,
            title: 'Phils BBQ',
            description: 'bEST barbecue in the entire San Diego International Airport!! ',
            location: [32.7339637, -117.2062292]
        },
        {
            id: 6,
            title: 'SeaWorld San Diego',
            description: 'Liberate the orcas',
            location: [32.7647948, -117.228797]
        },
    ]

   const [activities, setActivities] = useState([])
   const [selected, setSelected] = useState(null)

   useEffect(() => {
       setActivities([ ...dummyData])
   }, [])

//    useEffect(() => {
//        const sampleFetchedData = dummyData
//        setActivities( act => act.concat(sampleFetchedData))
//    }, activities)

// 
//    const handleDoubleClick = (e) => { //use to create new activity with marker 
//        const marker = L.Marker(e.latlng)
//    }

   const addActivity = (activity) => {
       setActivities((prevstate) => [...prevstate, activity])
   }

   const handleClickSelect = (id) => {
        setSelected(id)
        // document.getElementById('selected').scrollIntoView()
   }

    return (
        <div className="with-sidebar">
            <Sidebar
                activities={activities}
                selected={selected}
                handleClickSelect={handleClickSelect}
                addActivity={addActivity} />
            <div className="content">
                <MapContainer
                    activities={activities}
                    selected={selected}
                    handleClickSelect={handleClickSelect} />
            </div>
        </div>
    )

}