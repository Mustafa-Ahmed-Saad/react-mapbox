import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { ImLocation2 } from 'react-icons/im';
// import { FaBeer } from 'react-icons/fa';

// this data from apis
import * as parkData from '../../data/skateboard-parks.json';

const HomePage = () => {
  // this information and [props] of ReactMapGL
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    // latitude & longitude
    // latitude: 37.7577,
    // // longitude is nevative number
    // longitude: -122.4376,
    latitude: 45.383321536272049,
    longitude: -75.3372987731628,
    zoom: 8,
  });

  // when click on mark of park
  const [selectedPark, setSelectedPark] = useState(null);

  // add event to window when click Escape close popup of park
  useEffect(() => {
    // add event listener when componentDidMount
    // this will happend when render {componentDidMount}
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedPark(null);
      }
    };
    window.addEventListener('keydown', listener);

    // cleane or remove event listener when ComponentWillUnmount
    // this will happend when not render {componentWillUnmount}
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        // mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mustafasaad/ckw6yf3w02p0415t6ltsn2dqi"
      >
        {parkData?.features.map((park) => (
          <Marker
            key={park.properties.PARK_ID}
            longitude={park.geometry.coordinates[0]}
            latitude={park.geometry.coordinates[1]}
          >
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={(e) => {
                // e.preventDefault();
                setSelectedPark(park);
              }}
            >
              {/* <img src={markSvg} alt="mark" style={{ width: 20, height: 20 }} /> */}
              <ImLocation2 style={{ color: 'red', fontSize: '20px' }} />
            </button>
          </Marker>
        ))}

        {selectedPark ? (
          <Popup
            longitude={selectedPark.geometry.coordinates[0]}
            latitude={selectedPark.geometry.coordinates[1]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h5>{selectedPark.properties.NAME}</h5>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default HomePage;
