import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class PieChart extends Component {


  render() {

    var allLabels = ['1st', '2nd', '3rd', '4th', '5th'];

    var allValues = [
      [38, 27, 18, 10, 7],
      [28, 26, 21, 15, 10],
      [38, 19, 16, 14, 13],
      [31, 24, 19, 18, 8]
    ];
    
    var ultimateColors = [
      ['rgb(56, 75, 126)', 'rgb(18, 36, 37)', 'rgb(34, 53, 101)', 'rgb(36, 55, 57)', 'rgb(6, 4, 4)'],
      ['rgb(177, 127, 38)', 'rgb(205, 152, 36)', 'rgb(99, 79, 37)', 'rgb(129, 180, 179)', 'rgb(124, 103, 37)'],
      ['rgb(33, 75, 99)', 'rgb(79, 129, 102)', 'rgb(151, 179, 100)', 'rgb(175, 49, 35)', 'rgb(36, 73, 147)'],
      ['rgb(146, 123, 21)', 'rgb(177, 180, 34)', 'rgb(206, 206, 40)', 'rgb(175, 51, 21)', 'rgb(35, 36, 21)']
    ];
    
    
    return (
      <Plot
        data={[
          {
            values: this.props.data.map(e => {
                return e.count
            }),
            labels: this.props.data.map(e => {
            return e.lang
            }),
            mode: 'pie',
            style: {color:'black'}
          },
        ]}
        layout={ {width: this.props.elementWidth, height: this.props.elementHeight, 
                title: 'Languages',  
                font: {color:'black'},
                paper_bgcolor : 'rgba(0,0,0,0)', 
                plot_bgcolor : 'rgba(0,0,0,0)'} }
      />
    );
  }
}

export default PieChart;