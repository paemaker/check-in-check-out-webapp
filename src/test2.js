import React, { Component } from 'react';

import { connect } from 'react-redux';

const connector = connect(({drawer}) => 
    ({
        datadrawerType: drawer.type,
        datadrawerData: drawer.data
    })
)

class test2 extends Component 
{
    constructor(props)
    {
        super(props);
    }
    componentDidMount()
    {
        console.log(this.props.datadrawerData)
    }
    
    render() 
    {
    return (
        <div>
            {this.props.datadrawerType.test}
            {this.props.datadrawerData.test}
        </div>
    );
    }
}

export default connector(test2);