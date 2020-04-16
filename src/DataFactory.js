import React, {useState} from 'react';

function DataFactory(props){

  console.log(props);

  return(
    <>
      <p>{props.date}</p>
    </>
  )
}

export default DataFactory;