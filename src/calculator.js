import * as d3 from 'd3';

const groupData = (dataset, parameter) => {
  let bucketSize = 10;
  if (parameter === 'size_in_ha') {
    bucketSize = 0.5;
  }
  const hystoData = dataset.map((item, i) => Number(item[parameter]))

  const min = Math.min(...hystoData);
  const max = Math.max(...hystoData);
  const histGen =
    d3.histogram()
      .domain([min, max])
      .thresholds(d3.range(min, max, bucketSize));

  const bins = histGen(hystoData);
  const dataObj = bins.map((item) => {
    const range = String(item['x0']);
    return { name: `${range}`, 'Stands quantity': item.length }
  });
  return dataObj;
}

const groupDataForScatter = (dataset) => {
  return dataset.map(item => ({
    x: item.age_years,
    y: item.vol_m3_per_ha,
    z: 30
  }));
}

const groupDataForPie = (dataset) => {
  let pines = 0; 
  let spruces = 0; 
  let birches = 0; 
  let others = 0;
  dataset.forEach(item => {
    switch (item.main_species) {
      case 'pine':
        pines++
        break;
      case 'spruce':
        spruces++
        break;
      case 'birch':
        birches++
        break;
      case 'other':
        others++
        break;
      default:
        console.log('missing species name');
    }
  });
  return [
    { name: 'Pines', value: pines }, 
    { name: 'Spruces', value: spruces },
    { name: 'Birches', value: birches }, 
    { name: 'Others', value: others }
  ];
}

const createPoints = (dataset) => {
  return dataset.map(item => {
    return {
      type: 'Feature',
      properties: {
        description: `<strong>Stand #${item.standid} </strong><p>A stand of ${item.size_in_ha} hectares with expected wood volume of ${item.vol_m3_per_ha} per hectar. Main wood species is: ${item.main_species}, average age: ${item.age_years}</p>`,
        icon: `${item.main_species}`,
      },
      geometry: {
        type: 'Point',
        coordinates: [item.longitude, item.latitude]
      }
    }
  });
}

const filterDataset = (dataset, filter) => {
  if (filter === 'any') return dataset;
  return dataset.filter((item) => (item.main_species === filter))
}

export { 
  groupData, 
  createPoints, 
  filterDataset, 
  groupDataForScatter, 
  groupDataForPie 
}