import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
console.log('Starting front-end project');
const [results, setResults] = useState([]);

function fetchCityJSONData() {
 console.log('In fetch function');	
    return fetch("./cost_of_living_data.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
           console.log(data);
           return data;})
        .catch((error) => {
            console.error("Error fetching or parsing data:", error);
            throw error; 
        }); // Get the first 10 objects from the array
}
useEffect(() => {
        console.log('Page rendering starts');
        fetchCityJSONData();
    }, []);
	

  return (
 <div className="row">
   <h1>Cost of living in cities</h1>
   <div className="BarChart">
   <div className="YAxis">
   </div>
    <div className="BarChart-bar" style={{ height: '24.98%'}}>
      <div className = "BarChart-stack barchart--apartment" style={{height: '72.83%'}}>
         <p className="barchart--label">Shanghai</p>
      </div>
      <div className = "BarChart-stack barchart--utilities" style={{height: '4.4%'}}></div>
      <div className = "BarChart-stack barchart--food" style={{height: '22.77%'}}></div>
   </div>
   <div className="BarChart-bar" style={{ height: '13.11%'}}>
      <div className = "BarChart-stack barchart--apartment" style={{height: '66.4%'}}>
         <p className="barchart--label">Mumbai</p>
      </div>
      <div className = "BarChart-stack barchart--utilities" style={{height: '5.54%'}}></div>
      <div className = "BarChart-stack barchart--food" style={{height: '28.06%'}}></div>
   </div>
   </div>
   

  <div className="Legend">
	<div className="Legend-item">
	 <div className="Legend-color barchart--apartment"></div>
	 <p className="Legend-label">Apartment Rent</p>
	</div>
	<div className="Legend-item">
	 <div className="Legend-color barchart--utilities"></div>
	 <p className="Legend-label">Utilities</p>
	</div>
	<div className="Legend-item">
	 <div className="Legend-color barchart--food"></div>
	 <p className="Legend-label">Food</p>
	</div>
 </div>	
</div>	
 
  );
}

export default App;
