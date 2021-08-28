import React, { Component } from 'react'
import '../App.css';


export default class Asteroids extends Component {

    constructor(){
        super();
        this.state={
            asteroids:[],
            time: [],
            counter: 0,
            
        }
    }

    //grab the current time  (year-month-day) and store it in the state
    componentWillMount(){
        var today = new Date();
        var start = today.getFullYear()+'-'+0+(today.getMonth()+1)+'-'+today.getDate();  
        var end = today.getFullYear()+'-'+0+(today.getMonth()+1)+'-'+(today.getDate()+1); 

        this.setState({time: [start,end]})
    }


    componentDidMount(){
        
        fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${this.state.time[0]}&end_date=${this.state.time[1]}&api_key=${process.env.REACT_APP_APIKEY}`
        )
      .then(response => response.json())
      .then((data) => {
        let ast = []
        Object.values(data.near_earth_objects).forEach((arr)=>{
            //push the two arrays together
            ast.push(...arr)
        })
        this.setState({asteroids:ast})
       
      });
    }
    
    render() {
        return (
            <div>
                <h5 className="appText">Near earth objects</h5>

                <table className="asteroidTable">
                    <tbody className="asteroidTable">
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Magnitude</th>
                        <th>Hazardous</th>
                        <th>Sentry Object</th>
                    </tr>
                  
                { 
                
                this.state.asteroids.map((arr,index)=>(
                    //for each item (arr) there will be properties
                    
                <tr key={index}>
                    <td >{arr.name}</td>
                    <td >{arr.id}</td>
                    <td >{arr.absolute_magnitude_h}</td>
                    <td >{arr.is_potentially_hazardous_asteroid===true? "true": "false"}</td>
                    <td >{arr.is_sentry_object===true? "true": "false"}</td>
                    
                </tr> 
                
                ))  
                 
            }
            </tbody>
            </table>
                
            </div>
        )
    }
}
