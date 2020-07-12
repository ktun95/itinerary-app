import React, { useState, useEffect } from 'react' ;
import { connect } from 'react-redux';
import { Sidebar, MapContainer, AddActivity } from '../components';
import { getYelpBusinesses } from '../functions/mapFunctions';
import { postActivity, postBusiness } from '../store/'

export const ActivityMap = (props) => {
    const [display, setDisplay] = useState(props.activities)
    const [activities, setActivities] = useState([])
    const [openModal, setOpenModal] = useState(false)
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

   const handleOpenModal = () => {
       setOpenModal(!openModal)
   }

    const handleButtonClick = (category) => {
        switch (category) {
            case 'activities':
                showLayerGroup(props.map, [props.layers.activities])
                setDisplay(props.activities)
                break;
            case 'businesses':
                showLayerGroup(props.map, [props.layers.businesses])
                setDisplay(props.businesses)
                break;
            case 'all':
                showLayerGroup(props.map, [props.layers.businesses, props.layers.activities])
                setDisplay([...props.businesses, ...props.activities])
                break;
            default:
                return
        }
    }

    const showLayerGroup = (map, layers) => {
        // if (map.hasLayer(layer)) return
        const itineraryLayers = Object.keys(props.layers)

        itineraryLayers.forEach((l) => {
            map.removeLayer(props.layers[l])
        })
        layers.forEach(layer => {
            if (!map.hasLayer(layer)) map.addLayer(layer)
        })
    }

    return (
        <div className="with-sidebar">
            <Sidebar
                handleButtonClick={handleButtonClick}
                handleOpenModal={handleOpenModal}
                display={display}
                activities={props.activities}
                selected={selected}
                handleClickSelect={handleClickSelect}
                addActivity={addActivity} />
            <div className="content">
                {openModal ? <AddActivity isHidden={false} /> : <AddActivity isHidden={true} />}
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
    businesses: state.activityReducer.businesses,
    map: state.mapReducer.map,
    layers: state.mapReducer.layers
})

const mapDispatchToProps = dispatch => ({
    postActivity: (activity) => dispatch(postActivity(activity)),
    postBusiness: (business) => dispatch(postBusiness(business))
})

export default connect(mapStateToProps, mapDispatchToProps)(ActivityMap)
