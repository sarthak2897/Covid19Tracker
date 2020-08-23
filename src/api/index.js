import axios from 'axios';


//const url = "https://covid19.mathdro.id/api";
const url = "https://disease.sh/v3/covid-19/countries";


export const fetchAllCountriesData = async() => {
    try {
        const {data} = await axios.get(url);
        const countryData = data.map((country) => {
            return (
                country 
            )
        });
        console.log(countryData);
        return countryData;
    } catch (error) {
        alert(error);
    }
};
export const fetchData = async (country) => {
    let otherUrl = "https://disease.sh/v3/covid-19/all";
        try {
            if(country){
                otherUrl = `${url}/${country}`;
            }
            const {data} = await axios.get(otherUrl);
            const allData ={
                confirmed : data.cases,
                recovered : data.recovered,
                deaths : data.deaths,
                lastUpdate : data.updated
            };
            
              return allData;
        } catch (error) {
            alert(error);       
        }
};

export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get('https://covid19.mathdro.id/api/daily');
        const dailyData = data.map((dailyData) =>{
            return (
                {
            confirmed : dailyData.confirmed.total,
            deaths : dailyData.deaths.total,
            date : dailyData.reportDate,
            }
        )
        });
        return dailyData;
    } catch (error) {
        alert(error);       
    }
};

export const fetchCountryData = async () => {
    try {
        const {data} = await axios.get(url);
        const countryData = data.map((country) => {
           return ({
            name : country.country,
            prefix : country.countryInfo.iso3
           }
             
             ) 
        });
        return countryData;
    } catch (error) {
        alert(error);          
    }
};

export const fetchCountryMapLocation = async(countryName) => {
    try {
        const {data} = await axios.get(url);
        //console.log(data);
        let mapData =  null;
       data.forEach((country) => {
           if(country.country === countryName){
            mapData = {
               lat : country.countryInfo.lat,
               lng : country.countryInfo.long         
           }
        }
       });       
       return mapData;
    } catch (error) {
        alert(error);       
    }
}