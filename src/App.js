import React, { useState, useEffect } from 'react';
import './style.css';
function App() {
console.log('Starting front-end project');
/*const [cost_data, setCostData] = useState([{
	cityName: 'Shanghai',
	totalHeight: '24.98%',
	rentHeight: '72.83%',
	utilitiesHeight: '4.4%',
	foodHeight: '22.77%',
	},
	{
	cityName: 'Mumbai',
	totalHeight: '13.11%',
	rentHeight: '66.4%',
	utilitiesHeight: '5.54%',
	foodHeight: '28.06%',
	}
	]);*/
const [city_data, setCityData] = useState([]);
const [cost_data, setCostData] = useState([]);
const [selectedContinent, setSelectedContinent] = useState('Select');
const [pageNo, setPageNo ] = useState(0);

const yAxisLabels = []
for (let i = 6000; i >= 500; i -= 500) {
            yAxisLabels.push(<div className="YAxis-label">{i}</div>);
      }
const continents = ["Asia", "Europe", "Africa", "North America", "South America", "Oceania"];
function fetchCityJSONData() {
 console.log('In fetch function');	
    return fetch("./merged_data.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
           setCityData(data);
           console.log('No of cities', data.length);
           //setTotalItems(data.length); //Set total items for pagination
           const bar_height_data = setBarHeight(data);
           setCostData(bar_height_data);
                        
        })
        .catch((error) => {
            console.error("Error fetching or parsing data:", error);
            throw error; 
        }); // Get the first 10 objects from the array
}
useEffect(() => {
        console.log('Page rendering starts');
        fetchCityJSONData();
    }, []);
    
function setBarHeight(jsonData){
   const bar_height_data = []
   for(let cityData of jsonData)
   {
   	const entry = {};
	
	//Calculate total living expense for the month
	let totalSum = parseFloat(cityData['rent']) + parseFloat(cityData['utilities']) + parseFloat(cityData['meal']*60);
	let barHeight = totalSum/6000 * 100;
	
	//Set object properties like total bar-height
	entry.totalHeight = barHeight;
	entry.rent = cityData['rent'];
	entry.cityName = cityData['city'];
	entry.rentHeight = parseFloat(cityData['rent'])/totalSum * 100;
	entry.utilitiesHeight = parseFloat(cityData['utilities'])/totalSum * 100;
	entry.foodHeight = parseFloat(cityData['meal']*60)/totalSum * 100;
	
	//console.log(entry);
	bar_height_data.push(entry);
	
   }
   console.log(bar_height_data);
   return bar_height_data;
}
/*useEffect((ev) => {
    if (selectedContinent !== 'Select') {
      // Filter JSON data based on selected continent
      const filtered = city_data.filter(obj => obj.continent === selectedContinent);
      console.log('No of cities in', ev.target.value, filtered.length);
      const new_bar_height = setBarHeight(filtered);
      setCostData(new_bar_height);
    } else {
      setCostData([]);
    }
  }, [selectedContinent, city_data]); */
function onContinentChange(ev) {
    const continent = ev.target.value;
    console.log('Continent selected', continent);
    setSelectedContinent(continent);
    setPageNo(0); // Reset current page when continent changes
    
    const filtered = city_data.filter(obj => obj.continent === continent);
    console.log('No of cities in', continent, filtered.length);
    //setTotalItems(filtered.length);
    
    const new_bar_height = setBarHeight(filtered);
    setCostData(new_bar_height);
    //setCostData(new_bar_height.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  }
const onPageChange = (increment) => {
    setPageNo(prevPageNo => prevPageNo + increment);
  };

// Calculate total number of pages dynamically
 const totalPages = Math.ceil(cost_data.length / 10); 
 
  return (
 <div className="row">
   <h1>Cost of living in cities</h1>
   <label> Select Continent:
   	{/* <select onChange={(event) => setSelectedContinent(event.target.value)} value={selectedContinent}> */}
          <select onChange={onContinentChange} value={selectedContinent}> 
            <option value="Select">Select</option>
            {
            	continents.map(continent => (
            	 <option value={continent}>{continent}</option>
            	))
            }
          </select>
   </label>
   <div className="BarChart">
   <div className="YAxis">
   {yAxisLabels}
   </div>
    {/*<div className="BarChart-bar" style={{ height: '24.98%'}}>
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
   </div>*/}
   {
      	cost_data.slice(pageNo * 10, (pageNo + 1) * 10).map(city => (
      	<div className="BarChart-bar" style={{height: city.totalHeight+ "%"}}>
      	 <div className = "BarChart-stack barchart--apartment" style={{height: city.rentHeight+ "%"}}>
         <p className="barchart--label">{city.cityName}</p>
         </div>
         <div className = "BarChart-stack barchart--utilities" style={{height: city.utilitiesHeight+ "%"}}></div>
        <div className = "BarChart-stack barchart--food" style={{height: city.foodHeight+ "%"}}></div>
       </div>
   ))
   }
   </div>
    

  {/* Pagination */}
  <div>
  <button disabled={pageNo === 0} onClick={() => onPageChange(-1)}>Previous</button>
  <span> Page {pageNo + 1} of {totalPages} </span>
  <button disabled={pageNo === totalPages - 1} onClick={() => onPageChange(1)}>Next</button>
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
