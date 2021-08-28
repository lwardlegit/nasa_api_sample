import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'

// include MD bootstrap for radar chart
import { Radar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";


export default class CME extends Component {

    constructor(){
        super();

        this.state={
            coronaData:[],
            time:[],
            dataRadar:null
            
        }

       
    }



    //create a date object for reference
    componentWillMount(){
        var today = new Date();
        var start = (today.getFullYear()-1)+'-'+0+(today.getMonth()+1)+'-'+today.getDate();  
        var end = today.getFullYear()+'-'+0+(today.getMonth()+1)+'-'+today.getDate(); 
        this.setState({time: [start,end]})
    }


    //fetch api data and store it in state
    componentDidMount(){
        fetch(`https://api.nasa.gov/DONKI/CMEAnalysis?startDate=${this.state.time[0]}&endDate=${this.state.time[1]}&mostAccurateOnly=true&speed=500&halfAngle=30&catalog=ALL&api_key=${process.env.REACT_APP_APIKEY}`)
      .then(response => response.json())
      .then((data) => {   
            this.setState({coronaData:data})
            
            const dataRadar = {
                labels: ["speed", "halfAngle", "longitude", "latitude"],
                datasets: [
                    {
                    label: data[0].associatedCMEID,
                    backgroundColor: "rgba(194, 116, 161, 0.5)",
                    borderColor: "rgb(194, 116, 161)",
                    data:  [data[0].speed, data[0].halfAngle, data[0].longitude, data[0].latitude]
                    },
    
                    {
                    label: data[data.length-1].associatedCMEID,
                    backgroundColor: "rgba(71, 225, 167, 0.5)",
                    borderColor: "rgb(71, 225, 167)",
                    data:  [data[data.length-1].speed, data[data.length-1].halfAngle, data[data.length-1].longitude, data[data.length-1].latitude]
                    }
                ]
            }  

            return dataRadar
      })
      .then((dataRadar)=>{
          console.log(dataRadar)
          this.setState({dataRadar:dataRadar})
      })
    }



    render() { 
        
        return (
            <div className="CmeContainer">
                <div className="cmeCards">
                    <h5>Current Coronal Mass Ejection Data</h5>
                        { this.state.coronaData.map((property,index)=>(
                            <Card key={index} style={{ width: '18rem' }}>
                            <Card.Body>
                            <Card.Title>Period: {property.associatedCMEID}</Card.Title>
                            <Card.Text>long: {property.longitude}</Card.Text>
                            <Card.Text>speed: {property.speed}</Card.Text>
                            <Card.Text>notes: {property.note}</Card.Text>
                            </Card.Body>
                            </Card>  
                            ))
                        }
            </div>
          <h5 className="subheader" >Notes on CME data</h5>
          <p>Each card above represents one event pulled on a monthly basis, more cards will be rendered should additional events be added to the apis datastore</p>
    
          <div>
              <h5 className="coronaChartHeading"><b>Corona Ejection over Timespan</b></h5>

              {
                  this.state.dataRadar!==null?
                <MDBContainer className="radarChart">
                    <Radar data={this.state.dataRadar} options={{ responsive: true }} />
                </MDBContainer>
                : "Loading ..."
              }

              
          </div>
        </div>
        )
    }
}
