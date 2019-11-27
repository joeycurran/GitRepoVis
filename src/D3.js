import React, { Component } from 'react'
import LineChart from "./LineChart"

import './Magic.css'

class D3 extends Component {
   render(){
      
      return(
         <div className="d-flex">
            <div className="d-flex flex-column">
               <div className="d-flex flex-row">
                  <LineChart elementWidth={600} elementHeight={400} data={this.props.repoDates}/>
               </div>
            </div>
            <div className="d-flex flex-column">
           
            </div>
         </div>
      );
   }
}
export default D3
