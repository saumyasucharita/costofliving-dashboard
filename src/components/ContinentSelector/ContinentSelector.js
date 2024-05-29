import React from 'react';

const ContinentSelector = props => (
    <label> Select Continent:
        <select onChange = {props.onContinentChange} value = {props.selectedContinent}>
         {
            props.continents.map(continent => (
                     <option value = {continent}> {continent}</option> 
                    ))
         }
         </select>
         </label>
);
export default ContinentSelector;