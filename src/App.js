import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel'
import Asteroids from './components/Asteroids.js';
import CME from './components/CME.js';




export default class App extends Component {

  constructor(){
    super();
    this.state={
      images: [],
      query: 'rover'
    }
    this.searchQuery = React.createRef();
  this.handleSubmit = this.handleSubmit.bind(this);
  this.updateSearch = this.updateSearch.bind(this);
  }

  componentWillMount(){
    this.updateSearch()
  }



  updateSearch = () =>{
    fetch(`https://images-api.nasa.gov/search?q=${this.state.query}`
    )
  .then(response => response.json())
  .then(data => {
    
    var hrefs = []
    if(data.collection.items.length > 0){
    for( let obj = 0; obj in data.collection.items; obj++){
      hrefs.push(data.collection.items[obj].links[0].href+',')
    }
  }
  
    this.setState({images:hrefs})
  
  });
  }



  //add form value to state and finally delete form ref value
  handleSubmit(e) {
    e.preventDefault();

    if(this.searchQuery.current.value!== null || this.searchQuery.current.value!==''){
    this.setState({
      query: this.searchQuery.current.value
    })
  }
  this.updateSearch()
    this.searchQuery.current.value = ''
    
  }

  render() {
    return (
      <div className="app">
       
          {/* NEED TO MAP OUT ALL THE HREFS HERE AS IMAGES */}
      
      <div className="wrapper">
        <div className="imagePicker">
        <Carousel className="gridItem" fade>
            { this.state.images.map((href,index)=>(
                <Carousel.Item>
                <img key={index.toString()} width="450px" height="300px" className="d-block w-20" src={href.slice(0, -1)} alt="href"/>
                
              </Carousel.Item>
            ))
          }
        </Carousel>
        <form className="imageForm" onSubmit={this.handleSubmit}>
          <input type="text" ref={this.searchQuery} placeholder="search.."/>
          <input type ="submit"/>
          </form>


          <div className="imageForm">
            <h3>About</h3>

            <p>This application pulls from and organizes from several open source NASA APIs for research and observation for more information, see the docs below</p>
            <a href="https://api.nasa.gov/?search=press#browseAPI">List of all NASA APIs</a>

            <h5 className="subheader">Used in this project</h5>
            <ul>
              <li>NASA Image and Video Library</li>
              <li>NeoWs (Near Earth Object Web Service)</li>
              <li>DONKI - Coronal Mass Ejection (CME) Analysis</li>
            </ul>

            <h5 className="subheader">Development Considerations</h5>
            <p>
              one advantage of the open nasa APIs allowing users to dynamically supply dates in JavaScript is the ability to pull data over large spans of time and format them into charts
              without fighting large data sources or performing manual sorting
            </p>


            <h5 className="subheader">Source Code</h5>
            <a className="srcCodeLink" href="https://github.com/lwardlegit/nasa_api_sample">github repo</a>
          </div>
        </div>
        

        <Asteroids className="gridItem" />
        <CME className="gridItem" />
        </div>
      </div>
    )
  }
}
