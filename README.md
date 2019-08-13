This React app is a simple data visualisation tool for displaying the quantity and quality of wood resources in certain places of the map.
The data structure is also fairly simple: .csv file containing the string of data on each forest stand (quantity, coordinates, type, age etc.).

Application uses Mapbox library for displaying stands locations, and Recharts for other charts.

Two test data samples are located in `public/assets` folder.

Install instructions:

1. Unzip the folder to any place
2. Install dependencies by running `npm install`
3. Run project locally using `npm start`

Running instructions:
Edit the filename in "Data" input to address different dataset files.
It should in general fetch data from any correct entered URL, local files are set by default.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
