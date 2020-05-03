import React, {useState, useEffect} from 'react';
import DayPicker, {DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import DataFactory from './DataFactory';
import Thing from './Table';
import ShelterTable from './ShelterTable'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Styles = styled.div`
  background-color: white;
  height: 100vh;
  width: 100%;

  .calendar {
    text-align: center;
    align-items: center;
  }

  .theActual {
    border-radius: 20px;
    font-weight: bold;
    margin-top: 5rem;
    background-color: white;
    color: black;
  }

  p {
    color: black;
    font-weight: bold;
  }

`


function App() {

  const axios = require('axios');



  const url = 'https://blooming-castle-18936.herokuapp.com/shelterData/'
  // const url = 'http://localhost:8080/shelterData/' 

  const [selectedDay, setDay] = useState(null);
  const [dataDate, setDataDate] = useState(null);
  const [womensShelt, setWomensShelt] = useState(null);
  const [newArr, setNew] = useState([]);
  const [dataArr, setArr] = useState([]);
  const [womensArr, setWomens] = useState([]);


  useEffect(() => {
    dataArr[0] ? (setNew(dataArr[0].map(v => ({...v, PERCENTAGE: (Math.round((v.OCCUPANCY/v.CAPACITY)*100)), DISPDATE: (v.OCCUPANCY_DATE.slice(0,10))})))) : console.log(newArr)
    console.log(newArr)
  }, [dataArr])

  useEffect(() => {
    womensArr[0] ? (setNew(womensArr[0].map(v => ({...v, PERCENTAGE: (Math.round((v.OCCUPANCY/v.CAPACITY)*100)), DISPDATE: (v.OCCUPANCY_DATE.slice(0,10))})))) : console.log(newArr)
    console.log(newArr)
  }, [womensArr])
  

  useEffect(() => {
    setWomensShelt(null);
    console.log(url+dataDate);
    axios.get(url+dataDate)
    .then(function(response) {setArr([response.data])})
    .catch(function(err){console.log(err)})
  }, [dataDate])

  useEffect(() => {
    setDataDate(null);
    console.log(url+'shelter/'+womensShelt);
    axios.get(url+'shelter/'+womensShelt)
    .then(function(response) {setWomens([response.data])})
    .catch(function(err){console.log(err)})
  }, [womensShelt])


  const handleDayClick = (data) => {  
    setDay(data)
    let year = data.getFullYear();
    let day = data.getDate();
    let month = data.getMonth() + 1;
    if (day < 10){
      day = `0${day}`;
    }
    if (month < 10){
      month = `0${month}`;
    }
    if (year > 2019){
    setDataDate(`${year}-${month}-${day}T00:00:00`);
    } else if (year <= 2019){
      setDataDate(`${year}-${month}-${day}`);
    }
  }

    return (
      <>
      <Styles>
      <div className='calendar'>
        <DayPicker className='theActual'
          selectedDays={selectedDay}
          onDayClick={(data) => handleDayClick(data)}
          disabledDays={[
            {
              after: (new Date(new Date().setDate(new Date().getDate()-1))),
            },
          ]}
        />
        <p>
          {selectedDay
            ? selectedDay.toLocaleDateString()
            : 'Please select a day 👻'}
        </p>
        <p>If you want info on the following shelters, try the buttons. They should work lol</p>
        <p>The app is a bit buggy for sure with the new changes. You might have to click on a date more than once if you view the women's shelter data first. Okay, you'll definitely have to.</p>
        <button onClick={() => setWomensShelt('main')}>Women's Residence - Main Program</button><br/>
        <button onClick={() => setWomensShelt('weather')}>Women's Residence - Extreme Weather Program</button><br/>
        <button onClick={() => setWomensShelt('alexandra')}>Women's Residence - Alexandra Hotel</button><br/>
        <button onClick={() => setWomensShelt('bellwoods')}>Women's Residence - Bellwoods House</button><br/>
        <p>I wanted to add date ranges, but this was done as fast as possible.</p> 
        <p>We can add features (and make it look nice) over the next few days</p>
        <p>NaN indicates 'Not a Number' if the shelter had 0 capacity. I was lazy. Will change!</p>
        <p>Data is added every day at noon, after the city updates the dataset</p>
        {dataDate ? (<DataFactory date={dataDate}/>) : <p>Pick a date to load the table.</p>}
        {dataDate ? (<Thing arr={newArr}/>) : <p>Prepare for the world's okayest table.</p>}
        {womensShelt ? (<ShelterTable arr={newArr}/>) : <p>TEST</p>}
      </div>
      </Styles>
      </>
    );
  }

  export default App;

