import React, {useState, useEffect} from 'react';
import DayPicker, {DateUtils} from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import DataFactory from './DataFactory';
import Thing from './Table';



function App() {

  const axios = require('axios');



  const url = 'http://localhost:8080/shelterData/'


  const [selectedDay, setDay] = useState(null);
  const [dataDate, setDataDate] = useState(null);
  const [dataURL, setDataURL] = useState('');
  const [dataArr, setArr] = useState([]);


  useEffect(() => {
    console.log(dataArr);
  }, [dataArr])

  useEffect(() => {
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
      <div>
        <DayPicker
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
        {dataDate ? (<DataFactory date={dataDate}/>) : 'TEST'}
        {dataDate ? (<Thing arr={dataArr}/>) : 'TEST12312'}
      </div>
    );
  }

  export default App;

