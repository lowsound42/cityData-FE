import React, {useState, useEffect} from 'react';
import DayPicker, {DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import DataFactory from './DataFactory';
import Thing from './Table';
import styled from 'styled-components';

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
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }

`


function App() {

  const axios = require('axios');



  const url = 'https://blooming-castle-18936.herokuapp.com/shelterData/'


  const [selectedDay, setDay] = useState(null);
  const [dataDate, setDataDate] = useState(null);
  const [newArr, setNew] = useState([]);
  const [dataArr, setArr] = useState([]);


  useEffect(() => {
    dataArr[0] ? (setNew(dataArr[0].map(v => ({...v, PERCENTAGE: (Math.round((v.OCCUPANCY/v.CAPACITY)*100)), DISPDATE: (v.OCCUPANCY_DATE.slice(0,10))})))) : console.log(newArr)
    console.log(newArr)
  }, [dataArr])

  useEffect(() => {
    console.log(url+dataDate);
    axios.get(url+dataDate)
    .then(function(response) {setArr([response.data])})
    .catch(function(err){console.log(err)})
  }, [dataDate])


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
    setDataDate(`${year}-${month}-${day}T00:00:00`);
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
        <p>I wanted to add date ranges, but this was done as fast as possible.</p> 
        <p>We can add features (and make it look nice) over the next few days</p>
        <p>NaN indicates 'Not a Number' if the shelter had 0 capacity. I was lazy. Will change!</p>
        <p>Data is added every day at noon, after the city updates the dataset</p>
        {dataDate ? (<DataFactory date={dataDate}/>) : <p>Pick a date to load the table.</p>}
        {dataDate ? (<Thing arr={newArr}/>) : <p>Prepare for the world's okayest table.</p>}
      </div>
      </Styles>
      </>
    );
  }

  export default App;

