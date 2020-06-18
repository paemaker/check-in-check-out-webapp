import './ex_css.css';

import React, { Component } from 'react';

export default class App extends Component
{
  render ()
  {  
    return (
      <div className='bg'>
        <h1><a href="/LogIn"> LogIn </a></h1>
        <br />
        <h1><a href="/Homefront" > Home  </a></h1>
        <br />
        <h1><a href="/Profile"> Profile </a></h1>
        <br />
        <h1><a href="/Dashboard"> Dashboard </a></h1>
      </div>
    );
  }
}