# stacked-bar-chart-react
A React JS-based data visualization package to plot stacked bar charts.

Dataset used: Global Cost of Living dataset from Kaggle <br/>
https://www.kaggle.com/datasets/mvieira101/global-cost-of-living?datasetId=2687424&sortBy=voteCount<br/>
The data consists of cost of living information of about 5000 cities around the world. <br/>
I am using the below columns from the csv file to calculate the total living expense in a city: <br/>
- x1 -	Meal, Inexpensive Restaurant (USD) <br/>
- x48 - Apartment (1 bedroom) in City Centre (USD) <br/>
- x36 - Basic (Electricity, Heating, Cooling, Water, Garbage) for 85m2 Apartment (USD) <br/>

The csv file is converted to a JSON file and read using fetch() method of JS and a stacked bar-chart is plotted by calculating the height of individual bars.

![Screenshot](./img/Stacked_bar_chart.png)
