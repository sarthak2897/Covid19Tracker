import React from 'react'
import {Map as WorldMap,TileLayer,Circle,Popup,Marker} from 'react-leaflet';
import styles from './Map.module.css';
import 'leaflet/dist/leaflet.css';
import numeral from 'numeral';


const colors= {
    cases : {
        color : '#cc1232',
        constant : 800
    },
    recovered : {
        color : '#7dd71d',
        constant : 1200
    },
    deaths : {
        color : '#fb4443',
        constant : 2000
    }
}

function Map(props) {

        const showValuesOnMap =(type='cases') => (
        props.countryData.map((country) =>
        <Circle
        center={[country.countryInfo.lat,country.countryInfo.long]}
        fillOpacity={0.4}
        color={colors[type].color}
        fillColor={colors[type].color}
        radius={ Math.sqrt( country[type]) * colors[type].constant }>
        {/* <Marker position={props.center}> */}
        <Popup position={props.center}>
            <div className={styles.popupcontainer}>
                <div className={styles.popupflag} style={{backgroundImage:`url(${country.countryInfo.flag})`}} alt={country.country}></div>
                <div className={styles.popuptext} style={{fontWeight:'bold'}}>{country.country}</div>
                <div className={styles.popuptext}>Cases: {numeral(country.cases).format('0 a')}</div>
                <div className={styles.popuptext}>Recovered: {numeral(country.recovered).format('0 a')}</div>
                <div className={styles.popuptext}>Deaths : {numeral(country.deaths).format('0 a')}</div>
            </div>
        </Popup>
        {/* </Marker> */}
        </Circle>
        )
    );

    function openPopUp(marker) {
        if (marker && marker.leafletElement) {
            marker.leafletElement.openPopup()
        }
      }

      const pop = () => 
          props.countryData.map((c) =>
          (c.country === props.country ? (<Marker position={props.center} ref={openPopUp}>
        <Popup>
            <div className={styles.popupcontainer}>
                <div className={styles.popupflag} 
                style={{backgroundImage:`url(${c.countryInfo.flag})`}}></div>
                <div className={styles.popuptext} 
                style={{fontWeight:'bold'}}>{c.country}</div>
                <div className={styles.popuptext}>Cases: {numeral(c.cases).format('0 a')}</div>
                <div className={styles.popuptext}>Recovered: {numeral(c.recovered).format('0 a')}</div>
                <div className={styles.popuptext}>Deaths : {numeral(c.deaths).format('0 a')}</div>
            </div>
        </Popup>
        </Marker>) : null
          ));
    return (
        <div>
            <WorldMap className={styles.map} center={props.center} zoom={props.zoom}> 
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {showValuesOnMap(props.casestype)}
                { pop() }
                
            </WorldMap>

        </div>
    )
}


 
export default Map
