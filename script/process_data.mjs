import fs from 'fs';
const dataStr = fs.readFileSync('../public/cost_of_living_data.json');
const jsonData = JSON.parse(dataStr);

//Rename the 3 relevant JSON fields
const renamedData = jsonData.map(obj => {
    return {
        ...obj,
        rent: obj.x48,
        utilities: obj.x36,
        meal: obj.x1
    };
});

//Filter only the data having data quality as 1
const filteredData = renamedData.filter(obj => obj.data_quality === 1);

//Get public JSON having country to continent mapping
fetch('https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-continent.json')
.then(response => response.json())
.then(countryToContinentMap => {
    // Merge the JSON data with the continent information
    const mergedData = filteredData.map(obj => {
        const countryInfo = countryToContinentMap.find(country => country.country === obj.country);
        const continent = countryInfo ? countryInfo.continent : 'Unknown';

        return {
            ...obj,
            continent: continent,
        };
    });

    // Convert mergedData to JSON string
    const jsonContent = JSON.stringify(mergedData, null, 2);

    // Save JSON to a file in the public folder
    fs.writeFile('../public/merged_data.json', jsonContent, 'utf8', err => {
        if (err) {
            console.error('Error saving JSON file:', err);
        } else {
            console.log('JSON file saved successfully!');
        }
    });
})
.catch(error => {
    console.error('Error fetching country-to-continent mapping:', error);
});
