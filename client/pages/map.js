import React, { useState, useEffect } from 'react' ;
import { connect } from 'react-redux';
import { Sidebar, MapContainer } from '../components';
import { getYelpBusinesses } from '../functions/mapFunctions';
import { postActivity, postBusiness } from '../store/'

export const ActivityMap = (props) => {
    const [activities, setActivities] = useState([])
    const [selected, setSelected] = useState(null)
    const [businesses, setBusinesses] = useState([])
    const [viewCoordinates, setViewCoordinates] = useState([])

    useEffect(() => {
        setActivities(props.activities)
    }, [])

    useEffect(() => {
        // const yelpBusinesses = getYelpBusinesses({
        //     location: 'san-diego',
        //     term: 'food'
        // }).then((result) => {
        //     setBusinesses(result.businesses)
        // })
        props.postBusiness('san-diego', 'food') //later make this api use coordinates?  
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

    const showLayerGroup = (map, layers) => {
        // if (map.hasLayer(layer)) return
        map.eachLayer((l) => {
            map.removeLayer(l)
        })
        layers.forEach(layer => map.addLayer(layer))
    }

    return (
        <div className="with-sidebar">
            <Sidebar
                activities={props.activities}
                selected={selected}
                handleClickSelect={handleClickSelect}
                addActivity={addActivity} />
            <div className="content">
                <MapContainer
                    activities={props.activities}
                    businesses={props.businesses}
                    selected={selected}
                    handleClickSelect={handleClickSelect} />
            </div>
        </div>
    )

}

const mapStateToProps = (state) => ({
    activities: state.activityReducer.activities,
    businesses: state.activityReducer.businesses
})

const mapDispatchToProps = dispatch => ({
    postActivity: (activity) => dispatch(postActivity(activity)),
    postBusiness: (business) => dispatch(postBusiness(business))
})

export default connect(mapStateToProps, mapDispatchToProps)(ActivityMap)
