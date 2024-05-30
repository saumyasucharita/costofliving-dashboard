import React from 'react';
import './Legend.css';

const Legend = () => (
    <div className = "Legend" >
        <div className = "Legend-item" >
            <div className = "Legend-color barchart--apartment" >  </div>
                <p className = "Legend-label" > Apartment Rent </p>
        </ div >
        <div className = "Legend-item" >
            <div className = "Legend-color barchart--utilities" >  </div>
            <p className = "Legend-label" > Utilities </p>
        </div>
        <div className = "Legend-item" >
            <div className = "Legend-color barchart--food" >  </div>
            <p className = "Legend-label" > Food </p>
        </div>
    </div>
);
export default Legend;