import React from 'react';
import './BarChart.css';

//Generate y-axis labels
const yAxisLabels = []
for (let i = 6000; i >= 500; i -= 500) {
    yAxisLabels.push( < div className = "YAxis-label" > {
            i
        }
         </div> );
}

const BarChart = props => (
    <div className = "BarChart">
        <div className = "YAxis"> { yAxisLabels } </div>
        {props.cost_data.slice(props.pageNo * 10, (props.pageNo + 1) * 10).map(city => (
        <div className = "BarChart-bar" style = {{ height: city.totalHeight + "%"}}>
            <div className = "BarChart-stack barchart--apartment" style = {{height: city.rentHeight + "%" }}>
                <p className = "barchart--label" > { city.cityName } </p>
            </div>
            <div className = "BarChart-stack barchart--utilities" style = {{ height: city.utilitiesHeight + "%" }}> </div>
            <div className = "BarChart-stack barchart--food" style = {{ height: city.foodHeight + "%" }}> </div>
        </div> 
        )) }
    </div> 
);
export default BarChart; 