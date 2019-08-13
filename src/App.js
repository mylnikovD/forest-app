import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import memoize from 'memoize-one';

import { getDataset } from './api';
import * as calculator from './calculator';
import MapBox from './Components/MapBox';
import BarChart from './Components/BarChart';
import ScatterChartCC from './Components/ScatterChart';
import PieChartCC from './Components/PieChart'

import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisuals: false,
      dataset: [],
      species: 'any',
      url: `${process.env.PUBLIC_URL}/assets/dataset1000.csv`,
      loading: false,
    }
  }

  mapDataForBarChart = memoize(
    (dataset, parameter) => calculator.groupData(dataset, parameter)
  );

  mapDataForScatterChart = memoize(
    (dataset) => calculator.groupDataForScatter(dataset)
  )

  mapDataForMap = memoize(
    (dataset) => calculator.createPoints(dataset)
  );

  mapDataForPie = memoize(
    (dataset) => calculator.groupDataForPie(dataset)
  )

  mapDataForVolume = memoize(
    (dataset) => calculator.groupData(dataset, 'vol_m3_per_ha')
  )

  mapDataForAge = memoize(
    (dataset) => calculator.groupData(dataset, 'age_years')
  )

  mapDataForSize = memoize(
    (dataset) => calculator.groupData(dataset, 'size_in_ha')
  )

  filterDatasetBySpecies = memoize(
    (dataset, species) => calculator.filterDataset(dataset, species)
  )

  fetchDataset(url) {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const dataset = await getDataset(url);
        this.setState({
          loading: false,
          dataset
        });
      },
    )
  }

  onVisualiseClick = async () => {
    this.fetchDataset(this.state.url);
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSelect = event => {
    const filter = event.target.value;
    this.setState({ [event.target.name]: filter });
  };

  textFieldOptions = {
    shrink: true,
  };

  render() {
    const {
      url,
      dataset,
      species,
    } = this.state;

    const datasetBySpecies = this.filterDatasetBySpecies(dataset, species);
    const datasetForPie = this.mapDataForPie(dataset);
    const volumeChartData = this.mapDataForVolume(dataset);
    const ageChartData = this.mapDataForAge(dataset);
    const sizeChartData = this.mapDataForSize(dataset);
    const dataForMap = this.mapDataForMap(datasetBySpecies);
    const scatterChartData = this.mapDataForScatterChart(datasetBySpecies);

    const showVisuals = dataset.length > 0;

    return (
      <div className="App">
        <Typography
          variant='h2'
          align="center"
          paragraph
        >
          Forest data visualisation application
        </Typography>
        <TextField
          style={styles.textField}
          onChange={this.onInputChange}
          value={url}
          label="Data"
          placeholder="CSV URL"
          helperText="Enter the CSV-file's URL here"
          id="outlined-full-width"
          margin="normal"
          name="url"
          variant="outlined"
          InputLabelProps={this.textFieldOptions}
          fullWidth
        />
        <Button 
          variant="contained" 
          onClick={this.onVisualiseClick}
        >
          Visualise
        </Button>
        {showVisuals && (
          <Grid
            style={styles.container}
            align="center"
            justify="center"
            alignContent="center"
            alignItems="center"
            container
          >
            <Grid item xs={12}>
              <MapBox mapData={dataForMap} />
            </Grid>
            <Grid item xs={12} md={8}>
              <ScatterChartCC
                data={scatterChartData}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl>
                <InputLabel htmlFor="species-helper">Species</InputLabel>
                <Select
                  value={this.state.species}
                  onChange={this.handleSelect}
                  input={<Input name="species" id="species-helper" />}
                >
                  <MenuItem value="any">Any</MenuItem>
                  <MenuItem value="pine">Pine</MenuItem>
                  <MenuItem value="spruce">Spruce</MenuItem>
                  <MenuItem value="birch">Birch</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                <FormHelperText>Choose a specific species to display</FormHelperText>
              </FormControl>
              <Typography style={styles.typography}>Wood species composition</Typography>
              <PieChartCC data={datasetForPie} />
            </Grid>
            <Grid item xs={12} md={6}>
              <BarChart
                data={volumeChartData}
                xLabel="Wood volume in m3"
                barColor="#006600"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BarChart
                data={ageChartData}
                xLabel="Average age of trees"
                barColor="#8884d8"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BarChart
                data={sizeChartData}
                xLabel="Size of the stand in ha"
                barColor="#0033cc"
              />
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

const styles = {
  textField: {
    margin: 8,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  typography: {
    marginTop: '20px',
  },
}

export default App;

