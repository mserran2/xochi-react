/**
 * Created by mark on 7/21/17.
 */
import React, { Component } from 'react';
import Clock from '../components/Clock'
import './dashboard.css';
import $ from 'jquery';

class Dashboard extends Component {
    componentWillMount(){
        this._getNextMedium()
    }

    componentDidMount(){
        setInterval(()=>{
            this._getNextMedium();
        },15000)
    }

    constructor(){
        super();
        this.state = {
            current_space: '',
            d_image1: {
                data: {},
                main_elem: {}
            },
            d_image2: {
                data: {},
                main_elem: {}
            },
            d_video1: {
                data: {},
                main_elem: {}
            },
            d_video2: {
                data: {},
                main_elem: {}
            }
        }
        this.image_spaces = ['d_image1', 'd_image2']
        this.video_spaces = ['d_video1', 'd_video2']
    }

    _getSpaceClass(name){
        if(this.state.current_space === name){
            return 'active'
        }else {
            return 'dash_hide'
        }
    }

    _getNextImageSpace(){
        return this._getNextSpaceOfType('image');
    }

    _getNextVideoSpace(){
        return this._getNextSpaceOfType('video');
    }

    _getNextSpaceOfType(type){
        let ar = this[`${type}_spaces`];
        for(let i = 0; i< ar.length; i++){
            if(ar[i] !== this.state.current_space) return ar[i];
        }
    }

    _getNextMedium(){
        let network = this._fetchRandomImage()
        network.done((image) =>{
            let space = this._getNextSpaceOfType('image');
            let newState = {};
            newState[space] = {
                data: image
            };
            this.setState(newState);

            this.state[space].main_elem.onload = () => {
                this.setState({current_space: space})
            }

        });
    }

    _fetchRandomImage(){
        return $.ajax({
            method: 'GET',
            url: 'http://192.168.29.131:8080/media/random',
        });
    }

    render(){
        let views = []
        let arr = this.image_spaces.concat(this.video_spaces)
        for(let i =0; i < arr.length; i++)
            views.push(
                <div key={arr[i]} className={"DashboardContainer " + this._getSpaceClass(arr[i]) }>
                    <div className={"DashboardBG"} style={{backgroundImage : `url(${this.state[arr[i]].data.signed_url})`}} >
                    </div>
                    <img className="Dashimage" src={this.state[arr[i]].data.signed_url} ref={(input) => { this.state[arr[i]].main_elem = input; }} /> />
                </div>
            )
        return (
            <div className="Dashboard">
                {views}
                {/*<div className={"DashboardContainer " + this._getSpaceClass('d_image2') }>*/}
                    {/*<div className={"DashImage2 DashboardBG " + this._getSpaceClass('d_image2')}>*/}
                    {/*</div>*/}
                    {/*<img className="Dashimage" src={this.state.d_image2.data.signed_url} />*/}
                {/*</div>*/}
                {/*<div className={"DashboardContainer " + this._getSpaceClass('d_video1') }>*/}
                    {/*<div className={"DashVideo1 DashboardBG " + this._getSpaceClass('d_video1')}>*/}
                    {/*</div>*/}
                {/*</div>*/}
                {/*<div className={"DashboardContainer " + this._getSpaceClass('d_video2') }>*/}
                    {/*<div className={"DashVideo2 DashboardBG " + this._getSpaceClass('d_video2') }>*/}
                    {/*</div>*/}
                {/*</div>*/}
                <Clock />
            </div>

    )
    }
}

export default Dashboard;
