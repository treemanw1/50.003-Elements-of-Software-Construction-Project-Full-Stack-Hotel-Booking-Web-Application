import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';
// import { ColourOption, colourOptions } from '../data';
// import { ActionMeta, OnChangeValue } from 'react-select';

const style = {
  width:'100%',
  maxWidth:550,
}

const CreatableSingle = ({options}) => {
  return (
    // <div style={style}>
    <div style={style}>
      <CreatableSelect options={options}/>
      </div>
  );
}

export default CreatableSingle;