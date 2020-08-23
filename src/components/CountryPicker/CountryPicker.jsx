import React,{useState,useEffect} from 'react';
import {fetchCountryData} from '../../api/index';
import styles from './CountryPicker.module.css';
import {TextField}  from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';

const CountryPicker = (props) => {
    const [countryData, setCountryData] = useState({});
    
    useEffect(() => {
        const fetchCountryNameApi = async () => {
            const countryData = await fetchCountryData()
            console.log(countryData);
            setCountryData(countryData);
    
            }
            fetchCountryNameApi();
            
        },[]);
    
    // const country = countryName.length ? 
    // (
    //     countryName.map((country,index) => 
    //     <option value={country} key={index} className={styles.option}>{country}</option> 
    //         )
    // ) : null;
     

    //console.log(result);
    return (

                    <Autocomplete className={styles.country}
                    onChange={(event) => props.countryClick(event)}
                    options={countryData}
                    getOptionLabel={(countryData) => countryData.name}
                    style={{ width: 300}}
                    renderInput={(params) => <TextField {...params}
                    label="Choose a country" variant="outlined" />}
                    />
        
        )
};

export default CountryPicker;