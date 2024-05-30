import React, {useState, useEffect} from 'react';
import ContinentSelector from './components/ContinentSelector/ContinentSelector';
import BarChart from './components/BarChart/BarChart';
import Pagination from './components/Pagination/Pagination';
import Legend from './components/Legend/Legend';
import './style.css';

function App() {

    //State variables
    const [city_data, setCityData] = useState([]);
    const [selectedContinent, setSelectedContinent] = useState('Asia');
    const [pageNo, setPageNo] = useState(0);

    //Hard-coded list of continents
    const continents = ["Asia", "Europe", "Africa", "North America", "South America", "Oceania"];

    //Function to read json file in the public folder
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

        })
        .catch((error) => {
            console.error("Error fetching or parsing data:", error);
            throw error;
        }); 
    }

    //This 'useEffect' hook runs only once when the component mounts
    useEffect(() => {
        console.log('Page rendering starts');
        fetchCityJSONData();
    }, []);

    //Function to return the bar-heights in an object
    function setBarHeight(jsonData) {
        const bar_height_data = []
        for (let cityData of jsonData) {
            const entry = {};

            //Calculate total living expense for the month
            let totalSum = parseFloat(cityData['rent']) + parseFloat(cityData['utilities']) + parseFloat(cityData['meal'] * 60);
            let barHeight = totalSum / 6000 * 100; //$6000 is set as the maximum total living expense after looking at the data(New York City)

            //Set object properties like total bar-height
            entry.totalHeight = barHeight;
            entry.rent = cityData['rent'];
            entry.cityName = cityData['city'];
            //entry.continent = cityData['continent'];
            entry.rentHeight = parseFloat(cityData['rent']) / totalSum * 100;
            entry.utilitiesHeight = parseFloat(cityData['utilities']) / totalSum * 100;
            entry.foodHeight = parseFloat(cityData['meal'] * 60) / totalSum * 100;

            bar_height_data.push(entry);

        }
        console.log(bar_height_data);
        return bar_height_data;
    }

    //Function for event- when the user selects a continent from the drop-down
    function onContinentChange(ev) {
        const continent = ev.target.value;
        console.log('Continent selected', continent);
        setSelectedContinent(continent);
        setPageNo(0); // Reset current page when continent changes

        
    }
    const filtered = city_data.filter(obj => obj.continent === selectedContinent);
    console.log('No of cities in', selectedContinent, filtered.length);

    const cost_data = setBarHeight(filtered);

    //Event - User clicks on either Previous or Next button to change the current page
    const onPageChange = (increment) => {
        setPageNo(prevPageNo => prevPageNo + increment);
    };

    // Calculate total number of pages
    const totalPages = Math.ceil(cost_data.length / 10);

    return (
         <div className = "row">
             <h1> Cost of living in cities </h1>
             <ContinentSelector
                continents = {continents}
                selectedContinent = {selectedContinent}
                onContinentChange = {onContinentChange}
             />
            <BarChart 
                cost_data = {cost_data}
                pageNo = {pageNo}
            />
            { /* Pagination */}
            <Pagination
                pageNo = {pageNo}
                onPageChange = {onPageChange}
                totalPages = {totalPages}
            />
            <Legend />

        </div> );
}

export default App;
