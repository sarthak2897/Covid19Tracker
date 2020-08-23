import React from 'react';
import {Card, CardContent, Typography, Grid,CircularProgress} from '@material-ui/core';
import styles from './Cards.module.css';
//To add animation to numbers in card
import Countup from 'react-countup';



//{apidata: {confirmed,recovered,death,lastUpdate}}
const Cards = (props) => {
    const {confirmed,recovered,deaths,lastUpdate} = props.apidata;
    if(!confirmed){
        return (
            <div className={styles.loading}>
            <CircularProgress color="primary"/>
          </div>
        );
    }
    return (
        <Grid container justify="center" className={styles.card}>
            <Grid item component={Card} className={styles.infected} style={props.type === 'cases' ? props.styles : {} } onClick={props.click.bind(this,'cases')}>
                <CardContent>
                    <Typography color="textSecondary"
                    gutterBottom>Infected</Typography>
                    <Typography variant="h5" gutterBottom>
                        <Countup start={0} end={confirmed} duration={3} separator=','/>
                        </Typography>
                    <Typography color="textSecondary" gutterBottom>{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant="body2">Number of active cases of COVID-19</Typography>
                    </CardContent>
            </Grid>
            <Grid item component={Card} className={styles.recovered} style={props.type === 'recovered' ? props.styles : {} } onClick={props.click.bind(this,'recovered')}>
                <CardContent>
                <Typography color="textSecondary"
                    gutterBottom>Recovered</Typography>
                    <Typography variant="h5" gutterBottom>
                        <Countup start={0} end={recovered} duration={3} separator=','/>
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant="body2">Number of recoveries from COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card} className={styles.deaths} style={props.type === 'deaths' ? props.styles : {} }onClick={props.click.bind(this,'deaths')}>
                <CardContent>
                <Typography color="textSecondary"
                    gutterBottom>Deaths</Typography>
                    <Typography variant="h5" gutterBottom>
                        <Countup start={0} end={deaths} duration={3} separator=','/>
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant="body2">Number of deaths due to COVID-19</Typography>
                </CardContent>
            </Grid>
        </Grid>
    
    )
};

export default Cards;