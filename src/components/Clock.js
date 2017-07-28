/**
 * Created by mark on 7/21/17.
 */
import React, { Component } from 'react';
import './clock.css';
import Moment from 'react-moment';

class Clock extends Component {
    render(){
        return (
            <div className="Clock">
                <Moment interval={1000} format="hh:mm A"></Moment>
            </div>

        )
    }
}

export default Clock;
