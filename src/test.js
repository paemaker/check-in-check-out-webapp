import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setdrawerData } from './reducer/drawer/duck'
import {withRouter} from 'react-router-dom'

const connector = connect(
    ({drawer}) => ({
        datadrawerType: drawer.type,
        datadrawerData: drawer.data
    }),
    {
    setdrawerData        
    }
)
class test extends Component 
{
    constructor(props) 
    {
        super(props)
    }
    
  render() 
  {
    return(
      <div >
          <button onClick={() => {this.props.setdrawerData({type: 'data', data: {test:"test"}})
          this.props.history.push('/test2')
          }}>test</button>
      </div>
    );
  }
}

export default connector(withRouter(test));