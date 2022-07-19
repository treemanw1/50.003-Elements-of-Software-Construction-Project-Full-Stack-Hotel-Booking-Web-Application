import React, { Component } from 'react';

import Select from 'react-select';
// import { ColourOption, colourOptions } from '../data';
// import { ActionMeta, OnChangeValue } from 'react-select';

const style = {
  width:'100%',
  maxWidth:550,
}

const CreatableSingle = ({options, onInputChange, onChange}) => {
  return (
    // <div style={style}>
    <div style={style}>
      <Select options={options} onInputChange={onInputChange} onChange={onChange}/>
      </div>
  );
}

export default CreatableSingle;