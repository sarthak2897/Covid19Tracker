import React,{Component} from 'react';
import styles from './App.module.css';
import {Cards,Charts,CountryPicker} from './components';
import {fetchData,fetchCountryMapLocation,fetchAllCountriesData} from './api/index';
import {Switch,FormControlLabel} from '@material-ui/core';
import Map from './components/map/Map';
import 'leaflet/dist/leaflet.css';


class App extends Component {
  
  state = {
    apidata : {},
    country : '',
    chartview : false,
    center : {lat:20,lng:20},
    zoom : 2,
    countryData : [],
    casestype : 'cases',
    cardstyle : {},
  }


 async componentDidMount(){
     const data = await fetchData();
     const countryData = await fetchAllCountriesData();
     this.setState({apidata : data,countryData: countryData});
 }

countryHandler = async (event) => {
      console.log(event.target.value);
      const country= event.target.textContent;
      const countryData = await fetchData(country);
      const mapLocation = await fetchCountryMapLocation(country);
      this.setState({apidata : countryData,country : country, center : mapLocation,zoom : 3});
      console.log(this.state.center);
};

viewChange = () => {
  this.setState({chartview : !this.state.chartview});
};

setCaseType = (type) => {
  this.setState({casestype : type});
  if(type === 'cases')
      this.setState({cardstyle: {borderTop : '4px solid #cc1232'}});
  else if(type === 'recovered')
      this.setState({cardstyle: {borderTop : '4px solid #7dd71d'}});
  else
      this.setState({cardstyle: {borderTop : '4px solid #fb4443'}});
}


  render() {
    return (
      <div>
        <div className={styles.header}>
            <h2>COVID-19 TRACKER</h2>
            <CountryPicker countryClick={this.countryHandler}/> 
            {/* <Button variant='contained' color='primary' onClick={this.viewChange}>Toggle map depiction</Button> */}
            <FormControlLabel
            control={<Switch checked={this.state.chartview} color="primary" onChange={this.viewChange}/>}
            label={this.state.chartview ? 'Switch back to map view' : 'Switch to chart view'}
            >
            </FormControlLabel>
        </div>
        <div className={styles.main}>
          <div className={styles.card}>
          <Cards apidata={this.state.apidata} click={this.setCaseType} styles={this.state.cardstyle} type={this.state.casestype}/>
          </div>
           <div className={styles.mapArea}>
            {this.state.chartview ? 
            <Charts country={this.state.country} data={this.state.apidata} /> :
            <Map center={this.state.center} country={this.state.country} casestype={this.state.casestype}
            zoom={this.state.zoom} countryData={this.state.countryData}/> }
          </div> 
            
            
        </div>
      </div>
        )
  }
}
export default App;
